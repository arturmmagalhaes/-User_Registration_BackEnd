import express from 'express';
import { AddressController } from '../controller/AddressController';

export const addressRouter = express.Router();

addressRouter.post('/', new AddressController().insertAddress);