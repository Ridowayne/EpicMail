"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const authcontroller_1 = __importDefault(require("./../contollers/authcontroller"));
const router = (0, express_1.default)();
router.post('/signup', authcontroller_1.default.signUp);
router.post('/login', authcontroller_1.default.login);
router.post('/forgotPassword', authcontroller_1.default.forgotPassword);
router.post('/resetPassword/:resetToken', authcontroller_1.default.resetPassword);
router.get('/allUsers', extractJWT_1.default, authcontroller_1.default.getAllUsers);
module.exports = router;
