import express from 'express';
import { AddressController } from '../controller/AddressController';

export const addressRouter = express.Router();


addressRouter.post('/update/:id', new AddressController().updateAddress);
addressRouter.post('/', new AddressController().insertAddress);