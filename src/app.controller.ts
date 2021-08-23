import { Controller, Get, Query } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';

@Controller()
export class AppController {
  constructor(private readonly notification: NotificationGateway) {}

  @Get()
  getHello(@Query('id') id: any): any {
    const others = id === 'arpeiks' ? 'dimtrick' : 'arpeiks';

    setTimeout(() => {
      return this.notification.sendNotification(
        'I have completed this',
        `${id} just completed that`,
        id,
        [others, 'lukin'],
      );
    }, 5000);
  }
}
