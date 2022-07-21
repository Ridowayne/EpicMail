"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const MessagesController_1 = __importDefault(require("../contollers/MessagesController"));
const extractJWT_1 = __importDefault(require("../middlewares/extractJWT"));
const router = express_1.default.Router();
router.use(extractJWT_1.default);
router.post('/sendmail', extractJWT_1.default, MessagesController_1.default.createMessage);
router.get('/getMessage/:id', extractJWT_1.default, MessagesController_1.default.getMessage);
router.get('/inbox', extractJWT_1.default, MessagesController_1.default.inboxMessage);
router.get('/sentMessages', extractJWT_1.default, MessagesController_1.default.sentMessages);
router.get('/drafts', extractJWT_1.default, MessagesController_1.default.draftMessages);
router.get('/retractedMessages', extractJWT_1.default, MessagesController_1.default.retractedMessages);
router.patch('/retractMessage/:id', extractJWT_1.default, MessagesController_1.default.retractAMessage);
module.exports = router;
