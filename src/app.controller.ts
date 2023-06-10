import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { WebhookService } from './webook/webhook.service';
import { WebhookInterceptor } from './webook/webhook.interceptor';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly webhookService: WebhookService,
  ) {}

  @Post('/order')
  @UseInterceptors(WebhookInterceptor)
  async createOrder(@Body() data) {
    const createdOrder = this.appService.createOrder(data);

    return createdOrder;
  }
}
