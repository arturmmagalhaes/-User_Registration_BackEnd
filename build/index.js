"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = require("./router/UserRouter");
const PhoneRouter_1 = require("./router/PhoneRouter");
const AddressRouter_1 = require("./router/AddressRouter");
const AmountRouter_1 = require("./router/AmountRouter");
dotenv_1.default.config();
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/user', UserRouter_1.userRouter);
app.use('/phone', PhoneRouter_1.phoneRouter);
app.use('/address', AddressRouter_1.addressRouter);
app.use('/amount', AmountRouter_1.amountRouter);
const server = app.listen(3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost: ${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
