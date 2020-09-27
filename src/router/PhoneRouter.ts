import express from 'express';
import { PhoneController } from '../controller/PhoneController';

export const phoneRouter = express.Router();

phoneRouter.post('/', new PhoneController().insertPhone);