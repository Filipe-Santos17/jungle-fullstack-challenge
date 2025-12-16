import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { NotificationsServiceService } from './notifications-service.service';

@Controller()
export class NotificationsServiceController {
  constructor(private readonly notificationsServiceService: NotificationsServiceService) { }

  @MessagePattern("")
  getHello(@Payload() id: string): string {
    return this.notificationsServiceService.getHello();
  }
}
