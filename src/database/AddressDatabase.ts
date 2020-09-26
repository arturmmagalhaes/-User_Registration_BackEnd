import { BaseDatabase } from "./base/BaseDatabase";

export class AddressDatabase extends BaseDatabase {

    private static TABLE_NAME = 'Address';

    public async insertAddres(data: any) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${AddressDatabase.TABLE_NAME}
                VALUES ("${data.id}", "${data.cep}", "${data.street}", "${data.number}", "${data.complement}", "${data.city}", "${data.state}", "${data.id_user}")
            `);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}