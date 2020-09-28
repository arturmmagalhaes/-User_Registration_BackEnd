import { BaseDatabase } from "./base/BaseDatabase";

export class AddressDatabase extends BaseDatabase {

    private static TABLE_NAME = 'Address';

    public async insertAddress(data: any) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${AddressDatabase.TABLE_NAME}
                VALUES ("${data.id}", "${data.cep}", "${data.street}", "${data.number}", "${data.complement}", "${data.city}", "${data.state}", "${data.id_user}", "${data.dateNow}")
            `);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async updateAddress(data: any){
        try {
            await super.getConnection().raw(`
                UPDATE ${AddressDatabase.TABLE_NAME} 
                SET cep = "${data.cep}", street = "${data.street}", number = "${data.number}", complement = "${data.complement}", city = "${data.city}", state = "${data.state}", updateAt = "${data.dateNow}"
                WHERE id = "${data.id}"
            `);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}