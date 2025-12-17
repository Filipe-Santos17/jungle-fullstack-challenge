import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import * as Joi from 'joi';

import { RmqService } from '@app/packages';

import { TaskController } from './controllers/task.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthServiceService } from './api-gateway.service'
import { GuardModule } from './guards/guards.module';
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { StrategyModule } from './strategies/strategy.module';
import { GatewayModule } from './gateway/notifications.module';
import { NotificationsListener } from './listeners/notification-listener';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        //Rabbit
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_ENV: Joi.string().required(),
        RABBIT_MQ_TASKS_ENV: Joi.string().required(),

        //Jwt Security
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_MINUTES: Joi.number().required(),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required(),

        // Enviroment
        NODE_ENV: Joi.string().valid("dev", "prod").default("dev"),
      }),
      envFilePath: "./apps/api-gateway/.env"
    }),
    GuardModule,
    StrategyModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    GatewayModule,
  ],
  controllers: [TaskController, AuthController, NotificationsListener],
  providers: [RmqService, JwtAuthGuard, AuthServiceService],
  exports: [JwtAuthGuard]
})
export class ApiGatewayModule { }
