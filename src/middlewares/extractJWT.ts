import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import ErrorResponse from '../utils/Erromessage';
import People from '../models/peopleModel';

type MyToken = {
  email: string;
  id: any;
  iat: number;
  exp: number;
  iss: string;
};

const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(
      new ErrorResponse(
        'You are not logged in! Please log in to get access or Sign up if you are a new user.',
        401
      )
    );
  }
  const secret = process.env.JWT_SECRET;

  const decode = (await jwt.verify(token, config.token.secret)) as MyToken;
  if (!decode) {
    return new ErrorResponse(
      'You are not Authorized, Kindly log in to continue',
      401
    );
  }
  res.locals.jwt = decode;
  req.user = await People.findById({ _id: decode.id });
  console.log(req.user);

  next();
};

export default protectedRoute;
