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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const MailSchema = new mongoose_1.Schema({
    sender: {
        type: String,
        required: true,
    },
    senderID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'People',
    },
    receiver: {
        type: String,
        required: [true, 'Kindly provide a recipient for this message'],
    },
    receiverID: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'People',
    },
    status: {
        required: true,
        type: String,
        enum: ['sent', 'draft'],
        default: 'draft',
    },
    subject: {
        type: String,
    },
    body: {
        type: String,
        required: [true, 'Please provide a message to be sent'],
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    retracted: {
        type: Boolean,
        default: false,
    },
    opened: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    versionKey: false,
    timestamps: true,
});
MailSchema.post(/^findOne/, function (docs, next) {
    this.opened = true;
    next();
});
const Message = mongoose_1.default.model('Message', MailSchema);
exports.default = Message;
