import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import * as Joi from 'joi';

import { RmqService } from '@app/packages';

import { TaskController } from './controllers/task.controller';
import { AuthController } from './controllers/auth.controller';
import { GuardModule } from './guards/guards.module';
import { StrategyModule } from './strategies/strategy.module';
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthServiceService } from './api-gateway.service'


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

        NODE_ENV: Joi.string().valid("dev","prod").default("dev"),
      }),
      envFilePath: "./apps/api-gateway/.env"
    }),
    GuardModule,
    PassportModule,
    StrategyModule,        
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TaskController, AuthController],
  providers: [RmqService, StrategyModule, JwtAuthGuard, AuthServiceService],
  exports: [JwtAuthGuard]
})
export class ApiGatewayModule { }
