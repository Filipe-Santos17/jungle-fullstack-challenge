import { config } from 'dotenv';
import { DataSource } from 'typeorm'

import { EntityTasks } from './entities/task.entitie';
import { EntityUsers } from './entities/user.entitie';
import { EntityComments } from './entities/comment.entitie';

config();

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: +process.env.PORT_DB!,
    username: process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    entities: [EntityTasks, EntityUsers, EntityComments],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false
});