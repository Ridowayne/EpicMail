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
exports.getOne = exports.getMany = void 0;
const Erromessage_1 = __importDefault(require("../utils/Erromessage"));
const getMany = (Model, page, limit) => {
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const docs = yield Model.find().limit(limit).select('-password');
        return res.status(200).json({
            status: 'sucess',
            users: docs,
        });
    });
};
exports.getMany = getMany;
const getOne = (Model) => {
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const docs = yield Model.findOneById({ _id: req.params.id }).select('-password');
        if (!docs) {
            return next(new Erromessage_1.default('No document found with that ID', 404));
        }
        return res.status(200).json({
            status: 'sucess',
            users: docs,
        });
    });
};
exports.getOne = getOne;
