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


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_ENV: Joi.string().required(),
        RABBIT_MQ_TASKS_ENV: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
      envFilePath: "./apps/api-gateway/.env"
    }),
    GuardModule,
    PassportModule,
    StrategyModule,        
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TaskController, AuthController],
  providers: [RmqService, StrategyModule, JwtAuthGuard],
  exports: [JwtAuthGuard]
})
export class ApiGatewayModule { }
