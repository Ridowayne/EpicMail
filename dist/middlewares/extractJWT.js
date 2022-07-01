"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const extractJWT = (req, res, next) => {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.config.token.secret, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: error.message,
                    error: error,
                });
            }
            else {
                // const currentUser = People.findById({  decoded.id });
                // if (!currentUser) {
                //   return next(
                //     new ErrorResponse(
                //       'The user belonging to this token does no longer exist.',
                //       401
                //     )
                //   );
                // } else {
                //   res.locals.jwt = decoded;
                //   res.locals.user = currentUser;
                //   // req.user = currentUser;
                // }
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
};
exports.default = extractJWT;
