"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const MessagesController_1 = __importDefault(require("../contollers/MessagesController"));
const router = express_1.default.Router();
router.post('/sendmail', MessagesController_1.default.createMessage);
module.exports = router;
