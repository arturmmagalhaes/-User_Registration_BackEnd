import { BaseDatabase } from "./base/BaseDatabase";

export class AmountDatabase extends BaseDatabase {

    private static TABLE_NAME = "Amount";

    public async insertAmount(data: any) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${AmountDatabase.TABLE_NAME} 
                VALUES ("${data.id}", ${data.value}, "${data.id_user}")
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            super.destroyConnection();
        }
    }
}