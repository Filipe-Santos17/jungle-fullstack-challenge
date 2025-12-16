import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { TasksServiceController } from './tasks-service.controller';
import { TasksService } from './tasks-service.service';

import { DbModule, EntityComments, EntityTasks } from '@app/packages';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // Database
        HOST_DB: Joi.string().required(),
        PORT_DB: Joi.number().required(),
        USERNAME_DB: Joi.string().required(),
        PASSWORD_DB: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),

        // Rabbit
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_TASKS_ENV: Joi.string().required(),
      }),
      envFilePath: "./apps/tasks-service/.env"
    }),
    DbModule,
    TypeOrmModule.forFeature([EntityTasks, EntityComments])
  ],
  controllers: [TasksServiceController],
  providers: [TasksService],
})
export class TasksServiceModule { }
