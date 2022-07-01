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
exports.loginUser = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("./../config/config");
// dotenv.config({ path: './config.env' })
const UserModels_1 = __importDefault(require("../models/UserModels"));
// import signJWT from "../functions/signJWT";
const signJWT = (user, callback) => {
    var timeSinceEpoch = new Date().getTime();
    var expirationTime = timeSinceEpoch + Number(config_1.config.token.expiresIn) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 1000);
    try {
        jwt.sign({
            email: user.email,
            id: user._id,
        }, config_1.config.token.secret, {
            issuer: config_1.config.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds,
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
        console.log(error);
    }
};
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield UserModels_1.default.create({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            status: 'failed',
            message: 'Please provide username and password.',
        });
    }
    else {
        const person = yield UserModels_1.default.findOne({
            username,
        });
        if (!person) {
            return res.status(404).json({
                message: 'No User Found.',
            });
        }
        const isValidPassword = yield person.comparePassword(password);
        if (isValidPassword) {
            return res.status(200).json({
                status: 'success',
            });
        }
        else {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid Password!!',
            });
        }
    }
});
exports.loginUser = loginUser;
const userController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password: passwordBody } = req.body;
            if (!name || !email || !passwordBody)
                return res.status(400).json({ message: 'Missing data' });
            const isUserExists = yield UserModels_1.default.findOne({ email }).exec();
            if (isUserExists)
                return res.status(401).json({ message: 'User Already Exists' });
            const password = yield bcrypt_1.default.hash(passwordBody, 12);
            const newUser = yield new UserModels_1.default({
                name,
                email,
                password,
            }).save();
            return res.status(201).json(newUser);
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ message: 'Missing Data' });
            const user = yield UserModels_1.default.findOne({ email }).exec();
            if (!user)
                return res.status(401).json({ message: 'Email or Password is Wrong!' });
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid)
                return res.status(401).json({ message: 'Email or Password is Wrong!' });
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
    select: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id: _id } = req.params;
            const noSelect = ['-password', '-email', '-access_token'];
            if (_id) {
                const user = yield UserModels_1.default.findOne({ _id }, noSelect).exec();
                return res.status(200).json(user);
            }
            else {
                const users = yield UserModels_1.default.find({}, noSelect).exec();
                return res.status(200).json(users);
            }
        }
        catch (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }),
};
