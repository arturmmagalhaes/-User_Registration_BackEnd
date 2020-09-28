import { Request, Response } from 'express';
import { AmountBusiness } from '../business/AmountBusiness';
import { AmountDatabase } from '../database/AmountDatabase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerate } from '../services/IdGenerate';

export class AmountController {

    private static AMOUNTBUSINESS = new AmountBusiness(
        new AmountDatabase() as any,
        new IdGenerate() as any,
        new Authenticator() as any
    );

    public async insertAmount(req: Request, res: Response) {
        try {

            await AmountController.AMOUNTBUSINESS.insertAmount({
                token: req.headers.authorization as string,
                value: req.body.value as number
            });

            res.status(200).send({
                message: "Insert Amount"
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            });
        }
    }
}