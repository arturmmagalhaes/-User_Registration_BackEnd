import { BaseDatabase } from "../database/base/BaseDatabase";

export class AmountTable extends BaseDatabase{

    private static TABLE_NAME = "Amount";

    public async createTable() {
        try{
          await super.getConnection().raw(`
            CREATE TABLE IF NOT EXISTS ${AmountTable.TABLE_NAME}(
                id VARCHAR(255) PRIMARY KEY,
                value INT NOT NULL,
                id_user VARCHAR(255) NOT NULL,
                FOREIGN KEY (id_user) REFERENCES UserProvi(id)
            )
        `);
        } catch(error) {
            throw new Error(error.message);
        } finally {
            super.destroyConnection();
        }
    }
}