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

        return this.authenticator.generateToken({id});
    }

    public async insertCPF(dataController: any) {
        if(!dataController || !dataController.cpf || !dataController.token){
            throw new Error('Invalid Entry');
        }

        const id = await this.authenticator.getData(dataController.token);

        await this.userDatabase.insertCPF({
            id,
            cpf: dataController.cpf
        });
    }

    public async insertName(dataController: any) {
        if(!dataController || !dataController.name || !dataController.token){
            throw new Error('Invalid Entry');
        }

        const id = await this.authenticator.getData(dataController.token);

        await this.userDatabase.insertName({
            id,
            name: dataController.name
        });
    }

    public async insertBirthday(dataController: any) {
        if(!dataController || !dataController.birthday || !dataController.token){
            throw new Error('Invalid Entry');
        }

        const id = await this.authenticator.getData(dataController.token);
        
        await this.userDatabase.insertBirthday({
            id,
            birthday: this.transformDate(dataController.birthday)
        });
    }

    public transformDate(date: string) {
        const isDate = date.split('-')
        return `${isDate[2]}-${isDate[1]}-${isDate[0]}`
    }
}