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
exports.PhotoBusiness = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class PhotoBusiness {
    constructor(phoneDatabase, idGenerate, authenticator) {
        this.phoneDatabase = phoneDatabase;
        this.idGenerate = idGenerate;
        this.authenticator = authenticator;
    }
    insertPhone(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.number || !dataController.token) {
                throw new Error("Invalid Entry");
            }
            if (dataController.nextendpoint !== "Phone") {
                throw new Error("Invalid Path");
            }
            const id = this.idGenerate.generate();
            const id_user = yield this.authenticator.getData(dataController.token);
            yield this.phoneDatabase.insertPhone({
                id,
                number: dataController.number,
                id_user,
                dateNow: dayjs_1.default().format("YYYY-MM-DD HH:mm:ss")
            });
        });
    }
    updatePhone(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.id || !dataController.number || !dataController.token) {
                throw new Error("Invalid Entry");
            }
            const id_user = yield this.authenticator.getData(dataController.token);
            yield this.phoneDatabase.updatePhone({
                id: dataController.id,
                number: dataController.number,
                id_user,
                dateNow: dayjs_1.default().format("YYYY-MM-DD HH:mm:ss")
            });
        });
    }
}
exports.PhotoBusiness = PhotoBusiness;
