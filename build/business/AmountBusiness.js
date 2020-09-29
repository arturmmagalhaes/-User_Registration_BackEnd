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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountBusiness = void 0;
class AmountBusiness {
    constructor(amountDatabase, idGenerate, authenticator) {
        this.amountDatabase = amountDatabase;
        this.idGenerate = idGenerate;
        this.authenticator = authenticator;
    }
    insertAmount(dataController) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!dataController || !dataController.token || !dataController.value) {
                throw new Error("Invalid Entry");
            }
            if (dataController.nextendpoint !== "Amount") {
                throw new Error("Invalid Path");
            }
            const id = yield this.idGenerate.generate();
            const id_user = yield this.authenticator.getData(dataController.token);
            yield this.amountDatabase.insertAmount({
                id,
                value: dataController.value,
                id_user
            });
        });
    }
}
exports.AmountBusiness = AmountBusiness;
