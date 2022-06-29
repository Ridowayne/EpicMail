"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const authcontroller_1 = __importDefault(require("./../contollers/authcontroller"));
const router = (0, express_1.default)();
router.post('/signup', authcontroller_1.default.register);
router.post('/login', authcontroller_1.default.login);
router.post('/allUsers', authcontroller_1.default.getAllUsers);
module.exports = router;
