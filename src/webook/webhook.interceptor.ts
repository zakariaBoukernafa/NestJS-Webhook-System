import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WebhookService } from './webhook.service';

@Injectable()
export class WebhookInterceptor implements NestInterceptor {
  constructor(private readonly webhookService: WebhookService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(async (createdOrder) => {
        await this.webhookService.notifyShippingApplication(createdOrder);
      }),
    );
  }
}
