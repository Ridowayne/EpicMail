import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import app from './app';

dotenv.config({ path: './config.env' });

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

// error handling

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

export default app;
