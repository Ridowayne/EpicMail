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
const peopleModel_1 = __importDefault(require("../models/peopleModel"));
const Erromessage_1 = __importDefault(require("../utils/Erromessage"));
const MessageModel_1 = __importDefault(require("./../models/MessageModel"));
const createMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const receiverInfo = yield peopleModel_1.default.findOne({ email: req.body.receiver });
    if (!receiverInfo) {
        return new Erromessage_1.default('There is no user with such email, kindly confirm the email address', 404);
    }
    const newmail = new MessageModel_1.default({
        sender: req.user.email,
        senderID: req.user.id,
        receiver: req.body.receiver,
        receiverID: receiverInfo.id,
        status: req.body.status,
        heading: req.body.heading,
        body: req.body.body,
    });
    return yield newmail
        .save()
        .then((newmail) => res.status(201).json({ newmail }))
        .catch((error) => res.status(500).json({ error }));
});
const retractAMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield MessageModel_1.default.findOne({
            _id: req.params.id,
        });
        if (!message) {
            return res.status(404).json({
                status: 'fail',
                message: 'No message with such ID found',
            });
        }
        if (req.user.id !== message.senderID.toString()) {
            return res.status(401).json({
                status: 'fail',
                message: 'Only the sender can retract this message but you can delete if you do not wish to see it',
            });
        }
        yield message.updateOne({ retracted: 'true' });
        return res.status(200).json({
            status: 'success',
            report: 'message retracted and no longer availabe to be viewed by the receiver',
            content: message,
        });
    }
    catch (error) {
        return new Erromessage_1.default('could not get message at the moment', 404);
    }
});
const getMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield MessageModel_1.default.find({ _id: req.params.id });
        if (!message) {
            return res.status(404).json({
                status: 'fail',
                message: 'No message with such id was found',
            });
        }
        return res.status(200).json({
            status: 'success',
            content: message,
        });
    }
    catch (error) {
        return new Erromessage_1.default('could not get message at the moment', 404);
    }
});
const inboxMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield MessageModel_1.default.find({
            // receiver: { toString: () => req.user.email },
            receiverID: req.user.id,
            status: 'sent',
            retracted: false,
        });
        return res.status(200).json({
            status: 'success',
            count: message.length,
            content: message,
        });
    }
    catch (error) {
        return new Erromessage_1.default('could not get inbox message', 404);
    }
});
const sentMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = { senderID: req.user.id, status: 'sent' }.toString;
        const message = yield MessageModel_1.default.find({
            senderID: req.user.id,
            status: 'sent',
        });
        return res.status(200).json({
            status: 'success',
            content: message,
        });
    }
    catch (error) {
        return new Erromessage_1.default('could not get sent messages at the moment', 404);
    }
});
const retractedMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield MessageModel_1.default.find({
            senderID: req.user.id,
            retracted: true,
        });
        if (!message) {
            return res.status(404).json({
                status: 'fail',
                message: 'Unable to get Retracted Messages at the moment',
            });
        }
        return res.status(200).json({
            status: 'success',
            count: message.length,
            content: message,
        });
    }
    catch (error) {
        return new Erromessage_1.default('could not get Retracted messages at the moment', 404);
    }
});
const draftMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield MessageModel_1.default.find({
            senderID: req.user.id,
            status: 'draft',
        });
        if (!message) {
            return res.status(404).json({
                status: 'fail',
                message: 'Unable to get Draft Messages at the moment',
            });
        }
        return res.status(200).json({
            status: 'success',
            count: message.length,
            content: message,
        });
    }
    catch (error) {
        return new Erromessage_1.default('could not get Draft messages at the moment', 404);
    }
});
exports.default = {
    createMessage,
    retractAMessage,
    getMessage,
    inboxMessage,
    sentMessages,
    retractedMessages,
    draftMessages,
};
// const query = {
//   receiverID: req.user.id,
//   status: 'sent',
//   retracted: false,
// };
// const inbox = services.getMany(query);
