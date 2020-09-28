import Knex from 'knex';
import knex from 'knex';

export abstract class BaseDatabase {

    private static CONNECTION: Knex | null = null;

    protected getConnection(): Knex {
        if(BaseDatabase.CONNECTION === null){
            BaseDatabase.CONNECTION = knex({
                client: 'mysql',
                connection: {
                    database: process.env.DB_NAME,
                    host: process.env.DB_HOST,
                    user: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    port: Number(process.env.PORT) | 3306
                }
            });
        }
        return BaseDatabase.CONNECTION;
    }

    protected destroyConnection() {
        if(BaseDatabase.CONNECTION){
            BaseDatabase.CONNECTION = null;
        }
    }
}