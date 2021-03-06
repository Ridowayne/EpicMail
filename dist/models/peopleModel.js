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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const peopleSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: [true, 'kindly provide your name'],
        validate: [
            /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
            'Kindly provide a valid name',
        ],
    },
    phoneNumber: {
        type: Number,
        required: [true, 'kindl provide your phone number'],
        unique: true,
        validate: [
            /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
            'kindly provide a valid mobile number',
        ],
    },
    active: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'owner'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Kindly create a password'],
        minlength: [6, 'select a password with 6 or more characters']
    },
    email: {
        type: String,
        required: [true, 'kindly provide an email address'],
        unique: true,
        validate: [validator_1.default.isEmail, 'kindly provide a valid email address'],
    },
    userGroups: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Group',
        },
    ],
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('PEOPLE', peopleSchema);
