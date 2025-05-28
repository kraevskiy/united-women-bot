import { Injectable } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class AdminService {
	constructor(private readonly telegramService: TelegramService) {
	}


	async createSendMessage(body: {message: string}) {
		return {
			success: await this.telegramService.sendMessageForAll(body.message)
		}
	}
}
