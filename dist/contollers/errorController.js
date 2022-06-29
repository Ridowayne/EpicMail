"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Erromessage_1 = __importDefault(require("../utils/Erromessage"));
const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new Erromessage_1.default(message, 400);
};
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new Erromessage_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new Erromessage_1.default(message, 400);
};
const sendError = (err, req, res) => {
    let error;
    if (error.name === 'CastError')
        error = handleCastErrorDB(error);
    if (error.code === 11000 || error.name === 'MongoServerError')
        error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
        error = handleValidationErrorDB(error);
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
exports.default = sendError;
