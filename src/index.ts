import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AddressInfo } from 'net';
import { userRouter } from './router/UserRouter';
import { phoneRouter } from './router/PhoneRouter';
import { addressRouter } from './router/AddressRouter';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/phone', phoneRouter);
app.use('/address', addressRouter);

const server = app.listen(3003, () => {
    if(server){
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
})