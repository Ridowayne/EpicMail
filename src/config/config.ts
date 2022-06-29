import * as dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

// dotenv.config()

// dotenv.config({ path: __dirname+'./config.env' })

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.rbhkx.mongodb.net/?retryWrites=true&w=majority`;

const JWT_SECRET =
  process.env.JWT_SECRET ||
  'my-ultra-secure-and-ultra-long-secret-that-is-mine';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 86400;
const JWT_ISSUER = process.env.JWT_ISSUER || 'EpicMail';

const SERVER_PORT = process.env.PORT;
// ? Number(process.env.PORT) : 1337

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  token: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES_IN,
    issuer: JWT_ISSUER,
  },
};
