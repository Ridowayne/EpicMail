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
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config({ path: './config.env' });
const mongodb = () => __awaiter(void 0, void 0, void 0, function* () {
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
// error handling
const port = process.env.PORT || 9090;
// ? Number(process.env.PORT) : 1337
http_1.default.createServer(app_1.default).listen(port, () => {
    console.log(`server is up and running on port ${port}...`);
});
process.on('uncaughtException', (err) => {
    console.error(err && err.stack);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
});
exports.default = app_1.default;
