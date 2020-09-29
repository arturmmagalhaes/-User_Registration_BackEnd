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
exports.AmountDatabase = void 0;
const BaseDatabase_1 = require("./base/BaseDatabase");
class AmountDatabase extends BaseDatabase_1.BaseDatabase {
    insertAmount(data) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                INSERT INTO ${AmountDatabase.TABLE_NAME} 
                VALUES ("${data.id}", ${data.value}, "${data.id_user}")
            `);
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                _super.destroyConnection.call(this);
            }
        });
    }
}
exports.AmountDatabase = AmountDatabase;
AmountDatabase.TABLE_NAME = "Amount";
