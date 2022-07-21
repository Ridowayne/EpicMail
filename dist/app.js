"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const Erromessage_1 = __importDefault(require("./utils/Erromessage"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const documentations_1 = __importDefault(require("./helper/documentations"));
const errorController_1 = __importDefault(require("./contollers/errorController"));
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
// routes
app.get('/', (req, res) => {
    return res.status(200).send('welcome to Epic Mail Api');
});
app.use('/documentations', swagger_ui_express_1.default.serve);
app.use('/documentations', swagger_ui_express_1.default.setup(documentations_1.default));
app.use('/api/v1/mail', messageRoutes_1.default);
app.use('/api/v1/users', authRoutes_1.default);
// error handling
app.use((req, res, next) => {
    const error = new Error('not found');
    console.log(error);
    return res.status(404).json({
        status: 'fail',
        message: error.message,
    });
});
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `can not get ${req.originalUrl} on the server`,
    });
    next(new Erromessage_1.default(`can not get ${req.originalUrl} on the server`, 404));
});
app.use(errorController_1.default);
exports.default = app;
