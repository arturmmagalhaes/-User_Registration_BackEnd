import { BaseDatabase } from "./base/BaseDatabase";

export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = 'UserProvi';

    public async createUser(data: any) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${UserDatabase.TABLE_NAME} (id, email, password)
                VALUES ("${data.id}","${data.email}","${data.password}")
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async insertCPF(data: any) {
        try {
            await super.getConnection().raw(`
                UPDATE ${UserDatabase.TABLE_NAME} 
                SET cpf = "${data.cpf}" 
                WHERE id = "${data.id}"
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async insertName(data: any) {
        try {
            await super.getConnection().raw(`
                UPDATE ${UserDatabase.TABLE_NAME} 
                SET name = "${data.name}" 
                WHERE id = "${data.id}"
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async insertBirthday(data: any) {
        try {
            await super.getConnection().raw(`
                UPDATE ${UserDatabase.TABLE_NAME} 
                SET birthday = "${data.birthday}"
                WHERE id = "${data.id}"
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

}