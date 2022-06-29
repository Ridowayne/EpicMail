import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import { config } from './config/config';
import messagageRoutes from './routes/messageRoutes';
import authenticate from './routes/authRoutes';
import ErrorResponse from './utils/Erromessage';
import sendError from './contollers/errorController';

dotenv.config({ path: './config.env' });
const app = express();

const mongodb = async () => {
  await mongoose
    .connect(config.mongo.url)
    .then(() => {
      console.log('connected to the database successfully');
    })
    .catch((error) => {
      console.log(error);
    });
};
mongodb();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());

// routes
app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('welcome to Epic Mail Api');
});
app.use('/api/v1/mail', messagageRoutes);
app.use('/api/v1/users', authenticate);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `can not get ${req.originalUrl} on the server`,
  });
  next(new ErrorResponse(`can not get ${req.originalUrl} on the server`, 404));
});

// error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('not found');
  console.log(error);

  return res.status(404).json({
    status: 'fail',
    message: error.message,
  });
});

app.use(sendError);

const port = process.env.PORT || 9090;
// ? Number(process.env.PORT) : 1337
http.createServer(app).listen(port, () => {
  console.log(`server is up and running on port ${port}...`);
});

process.on('uncaughtException', (err) => {
  console.error(err && err.stack);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
});
