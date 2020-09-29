import { UserModelBirthday, UserModelCPF, UserModelCreate, UserModelName } from "../model/UserModel";
import { BaseDatabase } from "./base/BaseDatabase";

export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = 'UserProvi';

    public async createUser(data: UserModelCreate): Promise<void> {
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

    public async login(email: string) {
        try {
            const result = await super.getConnection().raw(`
                SELECT id, password FROM ${UserDatabase.TABLE_NAME}
                WHERE email = "${email}"
            `);

            return result[0][0];
        } catch (error) {
            throw new Error(error.message)
        } finally {
            await super.destroyConnection();
        }
    }

    public async insertCPF(data: UserModelCPF): Promise<void> {
        try {
            await super.getConnection().raw(`
                UPDATE ${UserDatabase.TABLE_NAME} 
                SET cpf = "${data.cpf}", updateAt = "${data.dateNow}"
                WHERE id = "${data.id}"
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async insertName(data: UserModelName): Promise<void> {
        try {
            await super.getConnection().raw(`
                UPDATE ${UserDatabase.TABLE_NAME} 
                SET name = "${data.name}", lastname = "${data.lastname}", updateAt = "${data.dateNow}"
                WHERE id = "${data.id}"
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }

    public async insertBirthday(data: UserModelBirthday): Promise<void> {
        try {
            await super.getConnection().raw(`
                UPDATE ${UserDatabase.TABLE_NAME} 
                SET birthday = "${data.birthday}", updateAt = "${data.dateNow}"
                WHERE id = "${data.id}"
            `);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            await super.destroyConnection();
        }
    }
}