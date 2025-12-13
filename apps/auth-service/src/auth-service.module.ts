import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt"
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';

import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_ENV: Joi.string().required(),
      }),
      envFilePath: "./apps/auth-service/.env"
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: 60 * 15,  },
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule { }
