import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBIT_MQ_URI!],
        queue: process.env.RABBIT_MQ_AUTH_ENV,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
}
bootstrap();
