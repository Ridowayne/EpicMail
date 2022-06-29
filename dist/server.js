'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const dotenv_1 = __importDefault(require('dotenv'));
const http_1 = __importDefault(require('http'));
const mongoose_1 = __importDefault(require('mongoose'));
const config_1 = require('./config/config');
const messageRoutes_1 = __importDefault(require('./routes/messageRoutes'));
const authRoutes_1 = __importDefault(require('./routes/authRoutes'));
const Erromessage_1 = __importDefault(require('./utils/Erromessage'));
const errorController_1 = __importDefault(
  require('./contollers/errorController')
);
dotenv_1.default.config({ path: './config.env' });
const app = (0, express_1.default)();
const mongodb = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default
      .connect(config_1.config.mongo.url)
      .then(() => {
        console.log('connected to the database successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  });
mongodb();
// middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// routes
app.get('/', (req, res) => {
  return res.status(200).send('welcome to Epic Mail Api');
});
app.use('/api/v1/mail', messageRoutes_1.default);
app.use('/api/v1/users', authRoutes_1.default);
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `can not get ${req.originalUrl} on the server`,
  });
  next(
    new Erromessage_1.default(
      `can not get ${req.originalUrl} on the server`,
      404
    )
  );
});
// error handling
app.use((req, res, next) => {
  const error = new Error('not found');
  console.log(error);
  return res.status(404).json({
    status: 'fail',
    message: error.message,
  });
});

app.use(errorController_1.default);

const port = process.env.PORT || 9090;
// ? Number(process.env.PORT) : 1337
http_1.default.createServer(app).listen(port, () => {
  console.log(`server is up and running on port ${port}...`);
});

process.on('uncaughtException', (err) => {
  console.error(err && err.stack);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
});
