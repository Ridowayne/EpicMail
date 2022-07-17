"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Erromessage_1 = __importDefault(require("../utils/Erromessage"));
const peopleModel_1 = __importDefault(require("../models/peopleModel"));
const protectedRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return next(new Erromessage_1.default('You are not logged in! Please log in to get access or Sign up if you are a new user.', 401));
    }
    const secret = process.env.JWT_SECRET;
    const decode = (yield jsonwebtoken_1.default.verify(token, config_1.config.token.secret));
    if (!decode) {
        return new Erromessage_1.default('You are not Authorized, Kindly log in to continue', 401);
    }
    res.locals.jwt = decode;
    req.user = yield peopleModel_1.default.findById({ _id: decode.id });
    console.log(req.user);
    next();
});
exports.default = protectedRoute;
// (error, result) => {
//   if (error) {
//     console.log(error);
//     return res.status(401).json({
//       message: 'You are not Authorized, Kindly log in to continue',
//     });
//   }
//   console.log(result);
//   // const userId = result.id;
// }
