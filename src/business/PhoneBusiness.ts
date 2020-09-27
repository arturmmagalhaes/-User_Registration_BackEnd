import { PhoneDatabase } from "../database/PhoneDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerate } from "../services/IdGenerate";

export class PhotoBusiness {
    
    constructor(
        private phoneDatabase: PhoneDatabase,
        private idGenerate: IdGenerate,
        private authenticator: Authenticator
    ){}

    public async insertPhone(dataController: any) {
        if(!dataController || !dataController.number || !dataController.token){
            throw new Error("Invalid Entry");
        }

        const id = this.idGenerate.generate();
        const id_user = await this.authenticator.getData(dataController.token);

        this.phoneDatabase.insertPhone({
            id,
            number: dataController.number,
            id_user
        })
    }
}