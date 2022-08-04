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
const MessageModel_1 = __importDefault(require("../models/MessageModel"));
const Erromessage_1 = __importDefault(require("../utils/Erromessage"));
const getMany = (query) => {
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        return yield MessageModel_1.default.find({ query });
    });
};
const getall = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield MessageModel_1.default.find();
    return result;
});
const getOne = (Model) => {
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const docs = yield Model.findOneById({ _id: req.params.id });
        if (!docs) {
            return next(new Erromessage_1.default('No document found with that ID', 404));
        }
        return res.status(200).json({
            status: 'sucess',
            users: docs,
        });
    });
};
exports.default = { getMany, getOne, getall };
