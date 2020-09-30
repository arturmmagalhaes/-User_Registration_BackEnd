import dayjs from "dayjs";
import { PhoneDatabase } from "../database/PhoneDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerate } from "../services/IdGenerate";

export class PhoneBusiness {
    
    constructor(
        private phoneDatabase: PhoneDatabase,
        private idGenerate: IdGenerate,
        private authenticator: Authenticator
    ){}

    public async insertPhone(dataController: any) {
        if(!dataController || !dataController.number || !dataController.token){
            throw new Error("Invalid Entry");
        }

        if(dataController.nextendpoint !== "Phone"){
            throw new Error("Invalid Path");
        }

        const id = this.idGenerate.generate();
        const id_user = await this.authenticator.getData(dataController.token);

        await this.phoneDatabase.insertPhone({
            id,
            number: dataController.number,
            id_user,
            dateNow: dayjs().format("YYYY-MM-DD HH:mm:ss")
        });
    }

    public async updatePhone(dataController: any) {
        if(!dataController || !dataController.id || !dataController.number || !dataController.token){
            throw new Error("Invalid Entry");
        }

        const id_user = await this.authenticator.getData(dataController.token);

        await this.phoneDatabase.updatePhone({
            id: dataController.id,
            number: dataController.number,
            id_user,
            dateNow: dayjs().format("YYYY-MM-DD HH:mm:ss")
        });
    }
}