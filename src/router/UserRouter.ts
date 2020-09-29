import express from 'express';
import { UserController } from '../controller/UserController';

export const userRouter = express.Router();

userRouter.post('/create', new UserController().createUser);
userRouter.post('/login', new UserController().login);
userRouter.post('/cpf', new UserController().insertCPF);
userRouter.post('/name', new UserController().insertName);
userRouter.post('/birthday', new UserController().insertBirthday);