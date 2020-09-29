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
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./base/BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    createUser(data) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                INSERT INTO ${UserDatabase.TABLE_NAME} (id, email, password)
                VALUES ("${data.id}","${data.email}","${data.password}")
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
    login(email) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _super.getConnection.call(this).raw(`
                SELECT id, password FROM ${UserDatabase.TABLE_NAME}
                WHERE email = "${email}"
            `);
                return result[0][0];
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield _super.destroyConnection.call(this);
            }
        });
    }
    insertCPF(data) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                UPDATE ${UserDatabase.TABLE_NAME} 
                SET cpf = "${data.cpf}", updateAt = "${data.dateNow}"
                WHERE id = "${data.id}"
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
    insertName(data) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                UPDATE ${UserDatabase.TABLE_NAME} 
                SET name = "${data.name}", lastname = "${data.lastname}", updateAt = "${data.dateNow}"
                WHERE id = "${data.id}"
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
    insertBirthday(data) {
        const _super = Object.create(null, {
            getConnection: { get: () => super.getConnection },
            destroyConnection: { get: () => super.destroyConnection }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.getConnection.call(this).raw(`
                UPDATE ${UserDatabase.TABLE_NAME} 
                SET birthday = "${data.birthday}", updateAt = "${data.dateNow}"
                WHERE id = "${data.id}"
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
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = 'UserProvi';
