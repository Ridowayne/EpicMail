"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const NAMESPACE = 'makeJWT';
const signJWT = (user, callback) => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config_1.config.token.expiresIn) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    console.log(NAMESPACE, `Attemptiing to sign token ${user.name}`);
    try {
        jsonwebtoken_1.default.sign({
            email: user.email, id: user._id
        }, config_1.config.token.secret, {
            issuer: config_1.config.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        console.log(NAMESPACE, error);
    }
};
exports.default = signJWT;
