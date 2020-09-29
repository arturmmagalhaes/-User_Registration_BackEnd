"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDatabase = void 0;
const knex_1 = __importDefault(require("knex"));
class BaseDatabase {
    getConnection() {
        if (BaseDatabase.CONNECTION === null) {
            BaseDatabase.CONNECTION = knex_1.default({
                client: 'mysql',
                connection: {
                    database: process.env.DB_NAME,
                    host: process.env.DB_HOST,
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    port: Number(process.env.PORT) | 3306
                }
            });
        }
        return BaseDatabase.CONNECTION;
    }
    destroyConnection() {
        if (BaseDatabase.CONNECTION) {
            BaseDatabase.CONNECTION = null;
        }
    }
}
exports.BaseDatabase = BaseDatabase;
BaseDatabase.CONNECTION = null;
