import express from 'express';
import { AmountController } from '../controller/AmountController';

export const amountRouter = express.Router()

amountRouter.post('/', new AmountController().insertAmount);