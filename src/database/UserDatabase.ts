import { BaseDatabase } from "./base/BaseDatabase";

export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = 'UserProvi';

    public async createUser(data: any) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${UserDatabase.TABLE_NAME} 
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
                INSERT INTO ${UserDatabase.TABLE_NAME} (cpf)
                VALUES ("${data.cpf}") 
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
                INSERT INTO ${UserDatabase.TABLE_NAME} (name)
                VALUES ("${data.name}") 
                WHERE id = "${}"
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
                INSERT INTO ${UserDatabase.TABLE_NAME} (birthday)
                VALUES ("${data.birthday}")
                WHERE id = "${data.id}"
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

}