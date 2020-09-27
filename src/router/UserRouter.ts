import express from 'express';
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

userRouter.post('/create', new UserController().createUser);
userRouter.post('/cpf', new UserController().createUser);
userRouter.post('/name', new UserController().createUser);
userRouter.post('/birthday', new UserController().createUser);