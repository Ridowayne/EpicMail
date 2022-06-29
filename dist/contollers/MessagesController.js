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
const MessageModel_1 = __importDefault(require("./../models/MessageModel"));
const createMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newmail = new MessageModel_1.default({
        sender: req.body.sender,
        receiver: req.body.receiver,
        heading: req.body.heading,
        body: req.body.body,
    });
    return newmail
        .save()
        .then((newmail) => res.status(200).json({ newmail }))
        .catch((error) => res.status(500).json({ error }));
});
exports.default = { createMessage };
