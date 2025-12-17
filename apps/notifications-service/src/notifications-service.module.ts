import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { NotificationController } from './notifications-service.controller';
import { NotificationService } from './notifications-service.service';

import { RmqService } from '@app/packages';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_NOTIFICATION_ENV: Joi.string().required(),
        RABBIT_MQ_API_GATEWAY_ENV: Joi.string().required(),
      }),
      envFilePath: './apps/notifications-service/.env'
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, RmqService],
})
export class NotificationsServiceModule { }