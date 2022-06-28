import {Request, Response, NextFunction} from 'express'

import ErrorResponse from "../utils/Erromessage";

const handleDuplicateFieldsDB = (err: { errmsg: { match: (arg0: RegExp) => any[]; }; }) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
  
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new ErrorResponse(message, 400);
};

const handleCastErrorDB = (err: { path: any; value: any; }) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new ErrorResponse(message, 400);
};

const handleValidationErrorDB = (err: { errors: { [s: string]: unknown; } | ArrayLike<unknown>; }) => {
    const errors = Object.values(err.errors);
  
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new ErrorResponse(message, 400);
};

const sendError = (err: { statusCode: any; status: any; message: any; stack: any; }, req:Request, res: Response) => {

    let error:any;

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000 || error.name === 'MongoServerError') error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
    
}
export default sendError
