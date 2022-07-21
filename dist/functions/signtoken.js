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
const NAMESPACE = 'makeJWT';
const makeJWT = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config_1.config.token.expiresIn) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    console.log(NAMESPACE, `Attemptiing to sign token ${user.name}`);
    return jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, config_1.config.token.secret, {
        issuer: config_1.config.token.issuer,
        algorithm: 'HS256',
        expiresIn: expirationTimeInSeconds,
    });
});
exports.default = makeJWT;
