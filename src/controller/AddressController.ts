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
                token: req.headers.authorization,
                cep: req.body.cep,
                street: req.body.street,
                number: req.body.number,
                complement: req.body.complement,
                city: req.body.city,
                state: req.body.state
            });

            res.status(200).send({
                message: "Insert Address"
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }
}