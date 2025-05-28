import { Inject, Injectable } from '@nestjs/common';
import { Bot, GrammyError, HttpError } from 'grammy';
import { BotContext } from './types';
import { ITelegramOptions } from './telegram.interface';
import { hydrate } from '@grammyjs/hydrate';
import { menuCommands } from './core/menu-commands';
import commands from './commands';
import callbackQuery from './queries';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { UsersService } from '../users/users.service';
import { TEXTS } from './helpers/texts';

@Injectable()
export class TelegramService {
	bot: Bot<BotContext>;
	options: ITelegramOptions;

	constructor(
		@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions,
		private readonly usersService: UsersService
	) {
		this.options = options;
		this.bot = new Bot(this.options.token);
		this.startBot()
	}

	async startBot() {
		this.bot.use(hydrate())
		this.bot.use((ctx, next) => {
			ctx.userService = this.usersService;
			next();
		})
		await this.bot.api.setMyCommands(menuCommands);
		this.bot.use(commands);
		this.bot.use(callbackQuery);
		this.bot.catch((e) => {
			const ctx = e.ctx;
			console.error(`Error while handling update ${ctx.update.update_id}`)

			if (e instanceof GrammyError) {
				console.error('Error in request: ', e.description)
			} else if (e instanceof HttpError) {
				console.error('Could not contact Telegram: ', e)
			} else {
				console.error('Unknown error: ', e)
			}
		})
		await this.bot.start();
	}

	async sendMessageForAll() {
		const users = await this.usersService.getAll();
		const errorsSendingIds: number[] = [];
		for (const user of users) {
			try {
				await this.bot.api.sendMessage(user.userId, TEXTS.welcome, {
					parse_mode: 'HTML'
				})
			} catch (e) {
				errorsSendingIds.push(user.userId)
			}
		}

		return errorsSendingIds.length ? {
			success: true,
			errorsSendingIds
		} : {
			success: true
		};
	}

	async sendMessageForUsers(users: number[], message: string) {
		const errorsSendingIds: number[] = [];
		for (const user of users) {
			try {
				await this.bot.api.sendMessage(user, TEXTS.welcome, {
					parse_mode: 'HTML'
				})
			} catch (e) {
				errorsSendingIds.push(user)
			}
		}

		return errorsSendingIds.length ? {
			success: true,
			errorsSendingIds
		} : {
			success: true
		};
	}
}
