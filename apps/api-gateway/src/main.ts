import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import cookieParser from 'cookie-parser';

import { ApiGatewayModule } from './api-gateway.module';
import { RpcToHttpExceptionFilter } from '@app/packages';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.enableCors({
    origin: "http://localhost:5173",
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new RpcToHttpExceptionFilter());

  const docs = new DocumentBuilder()
    .setTitle("Task-Api")
    .setDescription("Jungle Gaming challenge api documentation")
    .setVersion("1.0.0")
    .build()

  const pageDcos = SwaggerModule.createDocument(app, docs)

  SwaggerModule.setup("docs", app, pageDcos)

  app.use(cookieParser());

  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT')!);
}

bootstrap();
