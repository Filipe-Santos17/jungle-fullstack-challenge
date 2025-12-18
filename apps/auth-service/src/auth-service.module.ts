import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt"
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';

import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';

import { DbModule, EntityUsers, EntityRefreshToken } from '@app/packages';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // JWT AUTH
        JWT_SECRET: Joi.string().required(),
        SALT_OR_ROUNDS: Joi.string().required(),
        JWT_EXPIRATION_MINUTES: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.string().required(),

        // Rabbit
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_ENV: Joi.string().required(),

        // Database
        PORT_DB: Joi.number().required(),
        HOST_DB: Joi.string().required(),
        USERNAME_DB: Joi.string().required(),
        PASSWORD_DB: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
      }),
      envFilePath: "./apps/auth-service/.env"
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: 60 * 15, },
      }),
      inject: [ConfigService]
    }),
    DbModule,
    TypeOrmModule.forFeature([EntityUsers, EntityRefreshToken]),
  ],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule { }
