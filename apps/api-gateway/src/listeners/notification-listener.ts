import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsGateway } from '../gateway/notifications.gateway';

@Controller()
export class NotificationsListener {
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  @EventPattern('ws_notification_emit')
  handleWsNotification(
    @Payload() payload: {
      userId: string;
      type: string;
      message: string;
      metadata?: unknown;
    },
  ) {
    this.notificationsGateway.emitToUser(
      payload.userId,
      'notification',
      payload,
    );
  }
}
