"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneRouter = void 0;
const express_1 = __importDefault(require("express"));
const PhoneController_1 = require("../controller/PhoneController");
exports.phoneRouter = express_1.default.Router();
exports.phoneRouter.post('/update/:id', new PhoneController_1.PhoneController().updatePhone);
exports.phoneRouter.post('/', new PhoneController_1.PhoneController().insertPhone);
