import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import * as Joi from 'joi';
import { APP_GUARD } from '@nestjs/core';

import { RmqService } from '@app/packages';

import { AuthServiceService } from './api-gateway.service'

import { TaskController } from './controllers/task.controller';
import { AuthController } from './controllers/auth.controller';

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
        RABBIT_MQ_API_GATEWAY_ENV: Joi.string().required(),

        //Jwt Security
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_MINUTES: Joi.number().required(),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required(),

        // Enviroment
        NODE_ENV: Joi.string().valid("development", "production").default("development"),
      }),
      envFilePath: "./apps/api-gateway/.env"
    }),
    ThrottlerModule.forRoot({
      throttlers: [{
        ttl: 1000, // milisegundos
        limit: 10 // máximo de requests
      }]
    }),
    GuardModule,
    StrategyModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    GatewayModule,
  ],
  controllers: [TaskController, AuthController, NotificationsListener],
  providers: [RmqService, JwtAuthGuard, AuthServiceService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  exports: [JwtAuthGuard]
})
export class ApiGatewayModule { }
