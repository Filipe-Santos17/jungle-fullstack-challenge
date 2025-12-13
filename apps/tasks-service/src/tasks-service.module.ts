import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { TasksServiceController } from './tasks-service.controller';
import { TasksService } from './tasks-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_TASKS_ENV: Joi.string().required(),
      }),
      envFilePath: "./apps/tasks-service/.env"
    }),
  ],
  controllers: [TasksServiceController],
  providers: [TasksService],
})
export class TasksServiceModule { }
