"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = __importDefault(require("express"));
const AddressController_1 = require("../controller/AddressController");
exports.addressRouter = express_1.default.Router();
exports.addressRouter.post('/update/:id', new AddressController_1.AddressController().updateAddress);
exports.addressRouter.post('/', new AddressController_1.AddressController().insertAddress);
