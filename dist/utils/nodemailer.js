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
const nodemailer_1 = __importDefault(require("nodemailer"));
// async function sendEmail() {}
const sendEmail = (email, passwordResetToken, resetURL) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = nodemailer_1.default.createTransport({
        service: 'hotmail',
        auth: {
            user: 'ade_epick@outlook.com',
            pass: 'Google767',
        },
        // process.env.EMAIL_USERNAME,
        // process.env.EMAIL_PASSWORD,
    });
    const mailOptions = {
        from: 'Rilwn from Epic Mail <ade_epick@outlook.com>',
        to: email,
        subject: 'Reset password link',
        text: `Dear user Forgot your password? Submit a change of password request with your new password to: ${resetURL}.\nIf you didn't forget your password or request a password change, please ignore this email!`,
    };
    yield transport.sendMail(mailOptions);
});
exports.default = sendEmail;
