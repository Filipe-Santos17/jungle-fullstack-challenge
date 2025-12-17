import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationService } from './notifications-service.service';

@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @EventPattern('notification_dispatch')
  async handleNotification(@Payload() payload: any) {
    return this.notificationService.dispatch(payload);
  }
}
