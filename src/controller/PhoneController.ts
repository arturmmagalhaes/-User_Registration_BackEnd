import { Request, Response } from 'express';
import { PhotoBusiness } from "../business/PhoneBusiness";
import { PhoneDatabase } from "../database/PhoneDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerate } from "../services/IdGenerate";

export class PhoneController {

    private static PHONEBUSINESS = new PhotoBusiness(
        new PhoneDatabase() as any,
        new IdGenerate() as any,
        new Authenticator() as any
    );

    public async insertPhone(req: Request, res: Response){
        try {
            await PhoneController.PHONEBUSINESS.insertPhone({
                token: req.headers.authorization as string,
                number: req.body.number as string,
            });

            res.status(200).send({
                message: "Insert phone"
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }
}