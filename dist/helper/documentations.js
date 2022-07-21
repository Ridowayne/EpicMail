"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_doc_1 = __importDefault(require("../routes/auth.doc"));
const message_doc_1 = __importDefault(require("../routes/message.doc"));
const swaggerDocumentation = {
    openapi: '3.0.0',
    info: {
        tittle: 'Epic Mail',
        version: '1.0',
        description: 'This is the documentation page to Epic mail api',
    },
    servers: [
        {
            url: 'http://127.0.0.1:8080',
            description: 'local dev',
        },
        {
            url: 'https://epick-mail.herokuapp.com/',
            description: 'Production dev',
        },
    ],
    tags: [
        {
            name: 'Users',
            description: 'User routes',
        },
        {
            name: 'Mail',
            description: 'Mail routes',
        },
    ],
    paths: Object.assign(Object.assign({}, auth_doc_1.default), message_doc_1.default),
};
exports.default = swaggerDocumentation;
