import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import ErrorResponse from '../utils/Erromessage';
import People from '../models/peopleModel';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, config.token.secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: error.message,
          error: error,
        });
      } else {
        // const currentUser = People.findById({  decoded.id });
        // if (!currentUser) {
        //   return next(
        //     new ErrorResponse(
        //       'The user belonging to this token does no longer exist.',
        //       401
        //     )
        //   );
        // } else {
        //   res.locals.jwt = decoded;
        //   res.locals.user = currentUser;
        //   // req.user = currentUser;
        // }

        next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default extractJWT;
