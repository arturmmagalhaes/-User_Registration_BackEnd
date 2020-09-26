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

    public async insertCPF(data: string) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${UserDatabase.TABLE_NAME} (cpf)
                VALUES ("${data}")
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async insertName(data: string) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${UserDatabase.TABLE_NAME} (name)
                VALUES ("${data}")
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async insertBirthday(data: string) {
        try {
            await super.getConnection().raw(`
                INSERT INTO ${UserDatabase.TABLE_NAME} (birthday)
                VALUES ("${data}")
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

}