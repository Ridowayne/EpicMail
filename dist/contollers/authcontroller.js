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
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const peopleModel_1 = __importDefault(require("../models/peopleModel"));
const signtoken_1 = __importDefault(require("../functions/signtoken"));
const nodemailer_1 = __importDefault(require("../utils/nodemailer"));
const services = __importStar(require("../services/user.services"));
const Erromessage_1 = __importDefault(require("../utils/Erromessage"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, phoneNumber, password, email } = req.body;
        const hash = yield bcryptjs_1.default.hash(password, 10);
        const _user = new peopleModel_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            name,
            password: hash,
            email,
            phoneNumber,
        });
        yield _user.save();
        const token = yield (0, signtoken_1.default)(_user);
        return res.status(200).json({
            _id: _user._id,
            name: _user.name,
            email: _user.email,
            token: token,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'internal server Error, Please try again',
            error: error,
        });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res
                .status(400)
                .json({ message: 'Kindly provide a valid email and password' });
        const user = yield peopleModel_1.default.findOne({ email: req.body.email }).exec();
        if (!user)
            return res.status(401).json({ message: 'Email or Password is Wrong!' });
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: 'Email or Password is Wrong00!' });
        const token = yield (0, signtoken_1.default)(user);
        return res.status(200).json({
            _id: user._id,
            token: token,
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let email = req.body.email;
        if (!email)
            return res
                .status(404)
                .json({ message: 'kindly provide your email before sending' });
        const user = yield peopleModel_1.default.findOne({ email }).exec();
        if (!user) {
            return new Erromessage_1.default('No user with the email submitted', 404);
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const passwordResetToken = crypto_1.default
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        const passwordResetExpires = Date.now() + 10 * 60 * 2000;
        yield user.updateOne({
            resetPasswordToken: passwordResetToken,
            resetPasswordExpires: passwordResetExpires,
        });
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`;
        try {
            yield (0, nodemailer_1.default)(email, passwordResetToken, resetURL);
            return res.status(200).json({
                message: 'Token sent to you via your email, click on the link to verify',
            });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({
                error: error,
                message: 'something went wrong',
            });
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: 'Internal Server Error', error: error });
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedToken = crypto_1.default
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');
    const user = yield peopleModel_1.default.findOne({
        passworResetToken: hashedToken,
    });
    console.log(user);
    // passwordResetExpires: { $gt: Date.now },
    if (!user) {
        return next(new Erromessage_1.default('Token is invalid or has expired, Kindly try again', 404));
    }
    bcryptjs_1.default.hash(req.body.password, 10, (hashError, hash) => __awaiter(void 0, void 0, void 0, function* () {
        if (hashError) {
            res.status(500).json({
                message: hashError.message,
                error: hashError,
            });
        }
        (user.password = hash),
            (user.passwordResetToken = undefined),
            (user.passwordResetExpires = undefined),
            yield user.save();
        console.log(user.password);
        const token = yield (0, signtoken_1.default)(user);
        return res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: token,
        });
    }));
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var page = req.params.page ? req.params.page : 1;
        var limit = req.params.limit ? req.params.limit : 10;
        services.getMany(peopleModel_1.default, page, limit);
        // await People.find().select('-password');
        // return res.status(200).json({
        //   status: 'sucess',
        //   users: allUsers,
        // });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    services.getOne(peopleModel_1.default);
});
exports.default = {
    login,
    getAllUsers,
    forgotPassword,
    resetPassword,
    signUp,
    getUser,
};
