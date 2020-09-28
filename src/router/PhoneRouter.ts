import express from 'express';
import { PhoneController } from '../controller/PhoneController';

export const phoneRouter = express.Router();

phoneRouter.post('/update/:id', new PhoneController().updatePhone);
phoneRouter.post('/', new PhoneController().insertPhone);