import { BaseDatabase } from "../database/base/BaseDatabase";

export class UserTable extends BaseDatabase {
    
    private static TABLE_NAME = 'UserProvi';

    public async createTable() {
        try{
          await super.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS ${UserTable.TABLE_NAME} (
                id VARCHAR(255) PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                cpf VARCHAR(11) UNIQUE,
                name VARCHAR(255) UNIQUE,
                birthday VARCHAR(10) UNIQUE
            )`);
        } catch(error) {
            throw new Error(error.message)
        } finally {
            await super.destroyConnection();
        }
    }
}