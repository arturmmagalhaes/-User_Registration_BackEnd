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
exports.AddressTable = void 0;
const BaseDatabase_1 = require("../database/base/BaseDatabase");
class AddressTable extends BaseDatabase_1.BaseDatabase {
    createTable() {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                CREATE TABLE IF NOT EXISTS ${AddressTable.TABLE_NAME}(
                    id VARCHAR(255) PRIMARY KEY,
                    cep VARCHAR(255),
                    street VARCHAR(255), 
                    number VARCHAR(255), 
                    complement VARCHAR(255), 
                    city VARCHAR(255), 
                    state VARCHAR(255),
                    id_user VARCHAR(255) NOT NULL,
                    FOREIGN KEY (id_user) REFERENCES UserProvi(id)
                )
            `);
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield _super.destroyConnection.call(this);
            }
        });
    }
}
exports.AddressTable = AddressTable;
AddressTable.TABLE_NAME = 'Address';
