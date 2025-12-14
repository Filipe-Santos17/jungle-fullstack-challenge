import { config } from 'dotenv';
import { DataSource } from 'typeorm'

config();

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: +process.env.PORT_DB!,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    entities: [],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false
});