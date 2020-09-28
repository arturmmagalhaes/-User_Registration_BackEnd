import dayjs from 'dayjs';
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

        //FORMAT CPF: 00000000000
        if(!this.validateCPF(dataController.cpf)){
            throw new Error('Invalid CPF');
        }

        const id = await this.authenticator.getData(dataController.token);

        await this.userDatabase.insertCPF({
            id,
            cpf: dataController.cpf,
            dateNow: dayjs().format("YYYY-MM-DD HH:mm:ss")
        });
    }

    public async insertName(dataController: any) {
        if(!dataController || !dataController.name || !dataController.token){
            throw new Error('Invalid Entry');
        }

        const id = await this.authenticator.getData(dataController.token);

        const fullname = this.fullName(dataController.name);

        await this.userDatabase.insertName({
            id,
            name: fullname.name,
            lastname: fullname.lastName,
            dateNow: dayjs().format("YYYY-MM-DD HH:mm:ss")
        });
    }

    public async insertBirthday(dataController: any) {
        if(!dataController || !dataController.birthday || !dataController.token){
            throw new Error('Invalid Entry');
        }

        const id = await this.authenticator.getData(dataController.token); 
        
        await this.userDatabase.insertBirthday({
            id,
            birthday: this.transformDate(dataController.birthday),
            dateNow: dayjs().format("YYYY-MM-DD HH:mm:ss")
        });
    }

    public transformDate(date: string) {
        const isDate = date.split('-')
        return `${isDate[2]}-${isDate[1]}-${isDate[0]}`
    }

    public fullName(name: string) {
        let lastName = ''
        let s = name.split(' ')
        
        if(s.length > 1){
          for(let i = 1; i < s.length; i++){
            lastName += `${s[i]} `
          }
        }
      
        return {
            name: s[0], 
            lastName: lastName.trim()
        }
    }

    public validateCPF(cpf: string) {
        let sum = 0
        let validate = 10
        let isValid = false
      
        for(let i=1; i < cpf.length; i++){
          if(cpf[0] !== cpf[i]){
            isValid = true;
          }
        }
      
        if(isValid === true){

          for(let i = 0; i < 9; i++){
            sum += (Number(cpf[i])*validate);
            validate--;
          }
          
          let digit1 = sum*10%11;
      
          if(digit1 === 10){
            digit1 = 0
          }
          
          sum = 0;
          validate = 11;
      
          for(let i = 0; i < 10; i++){
            sum += (Number(cpf[i])*validate);
            validate--;
          }
          
          let digit2 = sum*10%11;
      
          if(digit2 === 10){
            digit2 = 0
          }
      
          if(Number(cpf.split("")[9]) === digit1 && Number(cpf.split("")[10]) === digit2){
            return true
          }
        }
          return false;
      }
}