"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: './config.env' });
// dotenv.config()
// dotenv.config({ path: __dirname+'./config.env' })
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.rbhkx.mongodb.net/?retryWrites=true&w=majority`;
const JWT_SECRET = process.env.JWT_SECRET ||
    'my-ultra-secure-and-ultra-long-secret-that-is-mine';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || 86400;
const JWT_ISSUER = process.env.JWT_ISSUER || 'EpicMail';
const SERVER_PORT = process.env.PORT;
// ? Number(process.env.PORT) : 1337
exports.config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
    token: {
        secret: JWT_SECRET,
        expiresIn: JWT_EXPIRES_IN,
        issuer: JWT_ISSUER,
    },
};
