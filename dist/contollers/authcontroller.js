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
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const peopleModel_1 = __importDefault(require("../models/peopleModel"));
const signJWT_1 = __importDefault(require("../functions/signJWT"));
const register = (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, phoneNumber, password, email } = req.body;
        bcryptjs_1.default.hash(password, 10, (hashError, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (hashError) {
                res.status(500).json({
                    message: hashError.message,
                    error: hashError
                });
            }
            const _user = new peopleModel_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                name,
                password: hash,
                email,
                phoneNumber
            });
            yield _user.save().then(_user => {
                (0, signJWT_1.default)(_user, (error, token) => {
                    if (error) {
                        return res.status(401).json({
                            message: 'Unauthorized',
                            error: error
                        });
                    }
                    return res.status(200).json({
                        _id: _user._id,
                        name: _user.name,
                        email: _user.email,
                        token: token
                    });
                });
            }).catch(err => {
                console.log(err);
                return res.status(200).json({
                    status: 'fail',
                    error: err
                });
            });
        }));
    }
    catch (error) {
        return res.status(500).json({
            message: 'internal server Error',
            error: error
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "Kindly provide a valid email and password" });
        const user = yield peopleModel_1.default.findOne({ email: req.body.email }).exec();
        if (!user)
            return res.status(401).json({ message: "Email or Password is Wrong!" });
        // console.log(user.password)
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Email or Password is Wrong oooo!" });
        (0, signJWT_1.default)(user, (error, token) => {
            if (error) {
                console.log(error);
                return res.status(401).json({
                    message: 'Unauthorized',
                    error: error
                });
            }
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token
            });
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
const forgotPassword = (req, res, next) => {
    try {
        let email = req.body.email;
        if (!email)
            return res.status(404).json({ message: 'kindly provide your email before sending' });
        const user = peopleModel_1.default.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ message: 'There is no user with the email submitted confirm it is the correct email or signup again' });
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const getAllUsers = (req, res, Next) => {
    try {
        const allUsers = peopleModel_1.default.find();
        return res.status(200).json({
            status: 'sucess',
            users: allUsers
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.default = { register, login, getAllUsers, forgotPassword };
