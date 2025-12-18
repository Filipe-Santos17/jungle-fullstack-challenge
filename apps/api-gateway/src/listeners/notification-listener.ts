import { Controller } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { NotificationsGateway } from '../gateway/notifications.gateway';
import { RmqService } from '@app/packages';

@Controller()
export class NotificationsListener {
  constructor(
    private readonly notificationsGateway: NotificationsGateway,
    private readonly rmqService: RmqService,
  ) { }

  @EventPattern('ws_notification_emit')
  handleWsNotification(
    @Payload() payload: any,
    @Ctx() context: RmqContext,
  ) {
    this.notificationsGateway.emitToUser(
      payload.userId,
      'notification',
      payload,
    );
  }
}
