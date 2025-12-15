import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DbService } from "./db.service";

import { EntityUsers } from "./entities/user.entitie";
import { EntityTasks } from "./entities/task.entitie";
import { EntityRefreshToken } from "./entities/refresh-token.entitie";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: "postgres",
                port: +configService.get<number>("PORT_DB")!,
                host: configService.get<string>("HOST_DB"),
                username: configService.get<string>("USERNAME_DB"),
                password: configService.get<string>("PASSWORD_DB"),
                database: configService.get<string>("DATABASE_DB"),
                entities: [EntityUsers, EntityTasks, EntityRefreshToken],
                migrations: [__dirname + "/migrations"],
                synchronize: false,
            }),
        }),
    ],
    providers: [DbService],
    exports: [TypeOrmModule, DbService]
})
export class DbModule { }