import { AmountDatabase } from "../database/AmountDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerate } from "../services/IdGenerate";

export class AmountBusiness {
    
    constructor(
        private amountDatabase: AmountDatabase,
        private idGenerate: IdGenerate,
        private authenticator: Authenticator
    ){}

    public async insertAmount(dataController: any) {      
        if(!dataController || !dataController.token || !dataController.value){
            throw new Error("Invalid Entry");
        }

        if(dataController.nextendpoint !== "Amount"){
            throw new Error("Invalid Path");
          }

        const id = await this.idGenerate.generate();
        
        const id_user = await this.authenticator.getData(dataController.token);
        
        await this.amountDatabase.insertAmount({
            id, 
            value: dataController.value,
            id_user
        });
    }
}