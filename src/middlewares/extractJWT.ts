import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

const NAMESPACE = 'authjwt';

const extractJWT = (req: Request, res: Response, Next: NextFunction) => {
  console.log(NAMESPACE, 'working on validating the token');
  let token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, config.token.secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: error.message,
          error: error,
        });
      } else {
        res.locals.jwt = decoded;
        Next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};

export default extractJWT;
