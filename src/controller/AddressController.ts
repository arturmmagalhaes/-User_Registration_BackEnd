import { Request, Response } from 'express';
import { AddressBusiness } from "../business/AddressBusiness";
import { AddressDatabase } from "../database/AddressDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerate } from "../services/IdGenerate";

export class AddressController {

    private static ADDRESSBUSINESS = new AddressBusiness(
        new AddressDatabase() as any,
        new IdGenerate() as any,
        new Authenticator() as any
    );

    public async insertAddress(req: Request, res: Response) {
        try {

            await AddressController.ADDRESSBUSINESS.insertAddress({
                token: req.headers.authorization as string,
                cep: req.body.cep,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                city: req.body.city,
                state: req.body.state,
                nextendpoint: req.body.nextendpoint
            });

            res.status(200).send({
                message: "Insert Address",
                nextendpoint: "AMOUNT"
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }

    public async updateAddress(req: Request, res: Response) {
        try {

            await AddressController.ADDRESSBUSINESS.updateAddress({
                id: req.params.id,
                token: req.headers.authorization as string,
                cep: req.body.cep,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                city: req.body.city,
                state: req.body.state
            });

            res.status(200).send({
                message: "Update Address"
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }
}