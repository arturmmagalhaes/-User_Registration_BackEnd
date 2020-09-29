"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class UserBusiness {
    constructor(userDatabase, idGenerate, hashManager, authenticator) {
        this.userDatabase = userDatabase;
        this.idGenerate = idGenerate;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }
    createUser(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.email || !dataController.password) {
                throw new Error('Invalid Entry');
            }
            const id = this.idGenerate.generate();
            const password = yield this.hashManager.hash(dataController.password);
            yield this.userDatabase.createUser({
                id,
                email: dataController.email,
                password
            });
            return this.authenticator.generateToken({ id });
        });
    }
    login(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.userDatabase.login(dataController.email);
            if (!(yield this.hashManager.compare(dataController.password, result.password))) {
                throw new Error("Invalid Email or Password");
            }
            return yield this.authenticator.generateToken({ id: result.id });
        });
    }
    insertCPF(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.cpf || !dataController.token) {
                throw new Error('Invalid Entry');
            }
            if (dataController.nextendpoint !== "CPF") {
                throw new Error("Invalid Path");
            }
            //FORMAT CPF: 00000000000
            if (!this.validateCPF(dataController.cpf)) {
                throw new Error('Invalid CPF');
            }
            const id = yield this.authenticator.getData(dataController.token);
            yield this.userDatabase.insertCPF({
                id,
                cpf: dataController.cpf,
                dateNow: dayjs_1.default().format("YYYY-MM-DD HH:mm:ss")
            });
        });
    }
    insertName(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.name || !dataController.token) {
                throw new Error('Invalid Entry');
            }
            if (dataController.nextendpoint !== "Fullname") {
                throw new Error("Invalid Path");
            }
            const id = yield this.authenticator.getData(dataController.token);
            const fullname = this.fullName(dataController.name);
            yield this.userDatabase.insertName({
                id,
                name: fullname.name,
                lastname: fullname.lastName,
                dateNow: dayjs_1.default().format("YYYY-MM-DD HH:mm:ss")
            });
        });
    }
    insertBirthday(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.birthday || !dataController.token) {
                throw new Error('Invalid Entry');
            }
            if (dataController.nextendpoint !== "Birthday") {
                throw new Error("Invalid Path");
            }
            const id = yield this.authenticator.getData(dataController.token);
            yield this.userDatabase.insertBirthday({
                id,
                birthday: this.transformDate(dataController.birthday),
                dateNow: dayjs_1.default().format("YYYY-MM-DD HH:mm:ss")
            });
        });
    }
    transformDate(date) {
        const isDate = date.split('-');
        return `${isDate[2]}-${isDate[1]}-${isDate[0]}`;
    }
    fullName(name) {
        let lastName = '';
        let s = name.split(' ');
        if (s.length > 1) {
            for (let i = 1; i < s.length; i++) {
                lastName += `${s[i]} `;
            }
        }
        return {
            name: s[0],
            lastName: lastName.trim()
        };
    }
    validateCPF(cpf) {
        let sum = 0;
        let validate = 10;
        let isValid = false;
        for (let i = 1; i < cpf.length; i++) {
            if (cpf[0] !== cpf[i]) {
                isValid = true;
            }
        }
        if (isValid === true) {
            for (let i = 0; i < 9; i++) {
                sum += (Number(cpf[i]) * validate);
                validate--;
            }
            let digit1 = sum * 10 % 11;
            if (digit1 === 10) {
                digit1 = 0;
            }
            sum = 0;
            validate = 11;
            for (let i = 0; i < 10; i++) {
                sum += (Number(cpf[i]) * validate);
                validate--;
            }
            let digit2 = sum * 10 % 11;
            if (digit2 === 10) {
                digit2 = 0;
            }
            if (Number(cpf.split("")[9]) === digit1 && Number(cpf.split("")[10]) === digit2) {
                return true;
            }
        }
        return false;
    }
}
exports.UserBusiness = UserBusiness;
