import { Injectable } from '@nestjs/common';
import { TelegramService } from './telegram/telegram.service';

@Injectable()
export class AppService {
  constructor(private readonly telegramService: TelegramService) {
  }
  async getHello(): Promise<string> {
    // await this.telegramService.sendMessageForAll()
    return 'Hello World!';
  }
}
