import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { WinstonModule } from 'nest-winston';
import cookieParser from 'cookie-parser';

import { ApiGatewayModule } from './api-gateway.module';
import { winstonLogger } from './logger/logger';
import { HttpLoggingInterceptor } from './intercerptors/logging.interceptor';
import { RpcToHttpExceptionFilter } from '@app/packages';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    logger: WinstonModule.createLogger({
      instance: winstonLogger,
    }),
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_MQ_URI],
      queue: process.env.RABBIT_MQ_API_GATEWAY_ENV, // ou API_GATEWAY_ENV
      queueOptions: { durable: true },
    },
  });

  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcToHttpExceptionFilter());
  app.useGlobalInterceptors(new HttpLoggingInterceptor());

  const docs = new DocumentBuilder()
    .setTitle("Task-Api")
    .setDescription("Jungle Gaming challenge api documentation")
    .setVersion("1.0.0")
    .build()

  const pageDcos = SwaggerModule.createDocument(app, docs)

  SwaggerModule.setup("docs", app, pageDcos)

  app.use(cookieParser());

  const configService = app.get(ConfigService);

  await app.startAllMicroservices();

  await app.listen(configService.get('PORT')!);
}

bootstrap();
