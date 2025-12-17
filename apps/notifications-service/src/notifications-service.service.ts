import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RmqService } from '@app/packages';

type NotificationPayload = {
  userId: string;
  type: string;
  message: string;
  metadata?: unknown;
};

@Injectable()
export class NotificationService {
  private readonly gatewayClient: ClientProxy;

  constructor(private readonly rmqService: RmqService) {
    this.gatewayClient = this.rmqService.getClientProxy('API_GATEWAY');
  }

  dispatch(payload: NotificationPayload): void {
    console.log('payload', payload);

    this.gatewayClient.emit('ws_notification_emit', payload);
  }
}
