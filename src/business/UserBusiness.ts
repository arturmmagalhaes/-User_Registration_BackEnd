import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerate } from "../services/IdGenerate";

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private idGenerate: IdGenerate,
        private hashManager: HashManager,
        private authenticator: Authenticator
        ){}

    public async createUser(dataController: any) {
        if(!dataController || !dataController.email || !dataController.password){
            throw new Error('Invalid Entry');
        }

        const id = this.idGenerate.generate();
        const password = await this.hashManager.hash(dataController.password);

        await this.userDatabase.createUser({
            id,
            email: dataController.email,
            password
        });

        return this.authenticator.generateToken(id);
    }

    public async insertCPF(dataController: any) {
        if(!dataController || !dataController.cpf){
            throw new Error('Invalid Entry');
        }

        this.userDatabase.insertCPF(dataController.cpf);
    }

    public async insertName(dataController: any) {
        if(!dataController || !dataController.name){
            throw new Error('Invalid Entry');
        }

        this.userDatabase.insertName(dataController.name);
    }

    public async insertBirthday(dataController: any) {
        if(!dataController || !dataController.birthday){
            throw new Error('Invalid Entry');
        }

        this.userDatabase.insertBirthday(dataController.birthday);
    }
}