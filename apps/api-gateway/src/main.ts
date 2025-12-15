import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import cookieParser from 'cookie-parser';

import { ApiGatewayModule } from './api-gateway.module';
import { RpcToHttpExceptionFilter } from '@app/packages';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcToHttpExceptionFilter());
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT')!);
}

bootstrap();
