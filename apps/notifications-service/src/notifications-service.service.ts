import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class NotificationsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
