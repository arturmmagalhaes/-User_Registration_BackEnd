import { AddressDatabase } from "../database/AddressDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerate } from "../services/IdGenerate";

export class AddressBusiness {

    constructor(
        private addressDatabase: AddressDatabase,
        private idGenerate: IdGenerate,
        private authenticator: Authenticator
    ){}

    public async insertAddress(dataController: any) {
        if(!dataController || !dataController.cep || !dataController.street || !dataController.number || !dataController.complement || !dataController.city || !dataController.state || !dataController.token){
            throw new Error("Invalid Entry");
        }

        const id = this.idGenerate.generate();
        const id_user = this.authenticator.getData(dataController.token)

        await this.addressDatabase.insertAddress({
            id,
            cep: dataController.cep,
            street: dataController.street,
            number: dataController.number,
            complement: dataController.complement,
            city: dataController.city,
            state: dataController.state,
            id_user
        });
    }
}