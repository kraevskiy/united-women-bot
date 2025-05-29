import { Injectable } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AdminService {
	constructor(
		private readonly telegramService: TelegramService,
		private readonly usersService: UsersService,
	) {
	}

	async createSendMessage(body: {message: string}) {
		return {
			success: await this.telegramService.sendMessageForAll(body.message)
		}
	}

	async getUsers() {
		return this.usersService.getAll()
	}
}
