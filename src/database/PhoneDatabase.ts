import { BaseDatabase } from "./base/BaseDatabase";

export class PhoneDatabase extends BaseDatabase {

    private static TABLE_NAME = 'Phone';

    public async insertPhone(data: any) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${PhoneDatabase.TABLE_NAME} 
                VALUES ("${data.id}","${data.number}","${data.id_user}")
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }
}