import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import People from '../models/peopleModel';
import makeJWT from '../functions/signtoken';
import sendEmail from '../utils/nodemailer';
import IUser from '../interfaces/authInterface';
import ErrorResponse from '../utils/Erromessage';

const signUp = async (req: Request, res: Response) => {
  try {
    let { name, phoneNumber, password, email } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const _user = new People({
      _id: new mongoose.Types.ObjectId(),
      name,
      password: hash,
      email,
      phoneNumber,
    });
    await _user.save();
    const token = await makeJWT(_user);
    return res.status(200).json({
      _id: _user._id,
      name: _user.name,
      email: _user.email,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'internal server Error, Please try again',
      error: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: 'Kindly provide a valid email and password' });

    const user = await People.findOne({ email: req.body.email }).exec();
    if (!user)
      return res.status(401).json({ message: 'Email or Password is Wrong!' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Email or Password is Wrong00!' });

    const token = await makeJWT(user);
    return res.status(200).json({
      _id: user._id,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let email = req.body.email;
    if (!email)
      return res
        .status(404)
        .json({ message: 'kindly provide your email before sending' });

    const user = await People.findOne({ email }).exec();
    if (!user) {
      return new ErrorResponse('No user with the email submitted', 404);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passwordResetExpires = Date.now() + 10 * 60 * 2000;

    await user.updateOne({
      resetPasswordToken: passwordResetToken,
      resetPasswordExpires: passwordResetExpires,
    });
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetpassword/${resetToken}`;
    try {
      await sendEmail(email, passwordResetToken, resetURL);
      return res.status(200).json({
        message:
          'Token sent to you via your email, click on the link to verify',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: error,
        message: 'something went wrong',
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal Server Error', error: error });
  }
};

const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const user = await People.findOne({
    passworResetToken: hashedToken,
  });
  console.log(user);
  // passwordResetExpires: { $gt: Date.now },

  if (!user) {
    return next(
      new ErrorResponse(
        'Token is invalid or has expired, Kindly try again',
        404
      )
    );
  }

  bcrypt.hash(req.body.password, 10, async (hashError, hash) => {
    if (hashError) {
      res.status(500).json({
        message: hashError.message,
        error: hashError,
      });
    }

    (user.password = hash),
      (user.passwordResetToken = undefined),
      (user.passwordResetExpires = undefined),
      await user.save();
    console.log(user.password);
    const token = await makeJWT(user);

    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  });
};

const getAllUsers = async (req: Request, res: Response, Next: NextFunction) => {
  try {
    const allUsers = await People.find().select('-password');
    return res.status(200).json({
      status: 'sucess',
      users: allUsers,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  login,
  getAllUsers,
  forgotPassword,
  resetPassword,
  signUp,
};
