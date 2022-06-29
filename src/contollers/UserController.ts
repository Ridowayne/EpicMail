import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import IUser from './../interfaces/authInterface';
import { config } from './../config/config';

// dotenv.config({ path: './config.env' })
import User, { UserDocument } from '../models/UserModels';
// import signJWT from "../functions/signJWT";

const signJWT = (
  user: IUser,
  callback: (error: Error | null, token: string | null) => void
): void => {
  var timeSinceEpoch = new Date().getTime();
  var expirationTime = timeSinceEpoch + Number(config.token.expiresIn) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  try {
    jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      config.token.secret,
      {
        issuer: config.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds,
      },
      (error, token) => {
        if (error) {
          callback(error, null);
        } else if (token) {
          callback(null, token);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: UserDocument = await User.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: 'failed',
      message: 'Please provide username and password.',
    });
  } else {
    const person = await User.findOne({
      username,
    });
    if (!person) {
      return res.status(404).json({
        message: 'No User Found.',
      });
    }
    const isValidPassword = await person.comparePassword(password);
    if (isValidPassword) {
      return res.status(200).json({
        status: 'success',
      });
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid Password!!',
      });
    }
  }
};

const userController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, email, password: passwordBody } = req.body;

      if (!name || !email || !passwordBody)
        return res.status(400).json({ message: 'Missing data' });

      const isUserExists = await User.findOne({ email }).exec();

      if (isUserExists)
        return res.status(401).json({ message: 'User Already Exists' });

      const password = await bcrypt.hash(passwordBody, 12);

      const newUser = await new User({
        name,
        email,
        password,
      }).save();

      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ message: 'Missing Data' });

      const user = await User.findOne({ email }).exec();

      if (!user)
        return res.status(401).json({ message: 'Email or Password is Wrong!' });

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid)
        return res.status(401).json({ message: 'Email or Password is Wrong!' });

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  select: async (req: Request, res: Response) => {
    try {
      const { id: _id } = req.params;
      const noSelect = ['-password', '-email', '-access_token'];
      if (_id) {
        const user = await User.findOne({ _id }, noSelect).exec();
        return res.status(200).json(user);
      } else {
        const users = await User.find({}, noSelect).exec();
        return res.status(200).json(users);
      }
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
