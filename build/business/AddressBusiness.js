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
exports.AddressBusiness = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const axios_1 = __importDefault(require("axios"));
class AddressBusiness {
    constructor(addressDatabase, idGenerate, authenticator) {
        this.addressDatabase = addressDatabase;
        this.idGenerate = idGenerate;
        this.authenticator = authenticator;
    }
    insertAddress(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.cep || !dataController.street || !dataController.number || !dataController.complement || !dataController.city || !dataController.state || !dataController.token) {
                throw new Error("Invalid Entry");
            }
            if (!(yield this.getAddress(dataController))) {
                throw new Error("Invalid Entry");
            }
            if (dataController.nextendpoint !== "ADDRESS") {
                throw new Error("Invalid Path");
            }
            const id = this.idGenerate.generate();
            const id_user = yield this.authenticator.getData(dataController.token);
            yield this.addressDatabase.insertAddress({
                id,
                cep: dataController.cep,
                street: dataController.street,
                number: dataController.number,
                complement: dataController.complement,
                city: dataController.city,
                state: dataController.state,
                id_user,
                dateNow: dayjs_1.default().format("YYYY-MM-DD HH:mm:ss")
            });
        });
    }
    updateAddress(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.id || !dataController.cep || !dataController.street || !dataController.number || !dataController.complement || !dataController.city || !dataController.state || !dataController.token) {
                throw new Error("Invalid Entry");
            }
            if (!(yield this.getAddress(dataController))) {
                throw new Error("Invalid Entry");
            }
            const id_user = yield this.authenticator.getData(dataController.token);
            yield this.addressDatabase.updateAddress({
                id: dataController.id,
                cep: dataController.cep,
                street: dataController.street,
                number: dataController.number,
                complement: dataController.complement,
                city: dataController.city,
                state: dataController.state,
                id_user,
                dateNow: dayjs_1.default().format("YYYY-MM-DD HH:mm:ss")
            });
        });
    }
    getAddress(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.get(`http://viacep.com.br/ws/${dataController.cep}/json/`)
                .then(response => {
                if (response.data.logradouro.toLowerCase() !== dataController.street.toLowerCase() ||
                    response.data.localidade.toLowerCase() !== dataController.city.toLowerCase()) {
                    return false;
                }
                return true;
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
}
exports.AddressBusiness = AddressBusiness;
