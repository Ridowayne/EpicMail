import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';

import ErrorResponse from './utils/Erromessage';
import messagageRoutes from './routes/messageRoutes';
import groupMessaging from './routes/groupRoutes';
import authenticate from './routes/authRoutes';
import swaggerDocumentation from './helper/documentations';
import sendError from './contollers/errorController';

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());

// routes
app.get('/', (req: Request, res: Response) => {
  return res.status(200).send('welcome to Epic Mail Api');
});
app.use('/documentations', swaggerUi.serve);
app.use('/documentations', swaggerUi.setup(swaggerDocumentation));
app.use('/api/v1/mail', messagageRoutes);
app.use('/api/v1/users', authenticate);
app.use('/api/v1/group', groupMessaging);

// error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('not found');
  console.log(error);

  return res.status(404).json({
    status: 'fail',
    message: error.message,
  });
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'fail',
    message: `can not get ${req.originalUrl} on the server`,
  });
  next(new ErrorResponse(`can not get ${req.originalUrl} on the server`, 404));
});

app.use(sendError);

export default app;
