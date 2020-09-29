"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountRouter = void 0;
const express_1 = __importDefault(require("express"));
const AmountController_1 = require("../controller/AmountController");
exports.amountRouter = express_1.default.Router();
exports.amountRouter.post('/', new AmountController_1.AmountController().insertAmount);
