"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/create', new UserController_1.UserController().createUser);
exports.userRouter.post('/login', new UserController_1.UserController().login);
exports.userRouter.post('/cpf', new UserController_1.UserController().insertCPF);
exports.userRouter.post('/name', new UserController_1.UserController().insertName);
exports.userRouter.post('/birthday', new UserController_1.UserController().insertBirthday);
