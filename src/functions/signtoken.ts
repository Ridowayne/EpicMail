import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import IUser from '../interfaces/authInterface';

const NAMESPACE = 'makeJWT';

const makeJWT = async (user: IUser) => {
  var timeSinceEpoch = new Date().getTime();
  var expirationTime = timeSinceEpoch + Number(config.token.expiresIn) * 100000;
  var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

  console.log(NAMESPACE, `Attemptiing to sign token ${user.name}`);

  return jwt.sign({ email: user.email, id: user._id }, config.token.secret, {
    issuer: config.token.issuer,
    algorithm: 'HS256',
    expiresIn: expirationTimeInSeconds,
  });
};

export default makeJWT