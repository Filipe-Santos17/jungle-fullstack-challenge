import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { RmqService } from '@app/packages';

import { TaskController } from './controllers/task.controller';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
      }),
      envFilePath: "./apps/api-gateway/.env"
    }),
  ],
  controllers: [TaskController, AuthController],
  providers: [RmqService]
})
export class ApiGatewayModule {}
