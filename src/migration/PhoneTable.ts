import { BaseDatabase } from "../database/base/BaseDatabase";

export class PhoneTable extends BaseDatabase {

    private static TABLE_NAME = 'Phone';

    public async createTable() {
        try{
          await super.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS ${PhoneTable.TABLE_NAME} (
                id VARCHAR(255) PRIMARY KEY,
                number VARCHAR(11) NOT NULL UNIQUE,
                id_user VARCHAR(255) NOT NULL UNIQUE,
                FOREIGN KEY (id_user) REFERENCES UserProvi(id)
            )
        `);
        } catch(error) {
            throw new Error (error.message);
        } finally {
            await super.destroyConnection();
        }
    }
}