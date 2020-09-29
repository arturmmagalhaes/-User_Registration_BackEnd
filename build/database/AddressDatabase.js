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
exports.AddressDatabase = void 0;
const BaseDatabase_1 = require("./base/BaseDatabase");
class AddressDatabase extends BaseDatabase_1.BaseDatabase {
    insertAddress(data) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                INSERT INTO ${AddressDatabase.TABLE_NAME}
                VALUES ("${data.id}", "${data.cep}", "${data.street}", "${data.number}", "${data.complement}", "${data.city}", "${data.state}", "${data.id_user}", "${data.dateNow}")
            `);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    updateAddress(data) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                UPDATE ${AddressDatabase.TABLE_NAME} 
                SET cep = "${data.cep}", street = "${data.street}", number = "${data.number}", complement = "${data.complement}", city = "${data.city}", state = "${data.state}", updateAt = "${data.dateNow}"
                WHERE id = "${data.id}" and id_user = "${data.id_user}"
            `);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.AddressDatabase = AddressDatabase;
AddressDatabase.TABLE_NAME = 'Address';
