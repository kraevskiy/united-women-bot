import { ConfigService } from '@nestjs/config';
import { ITelegramOptions } from '../telegram/telegram.interface';

export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	const token = configService.get('TELEGRAM_API_BOT_KEY');
	if (!token) {
		throw new Error('TELEGRAM_API_BOT_KEY not found in .env')
	}
	return {
		token,
		chatId: configService.get('TELEGRAM_DEFAULT_CHAT_ID') ?? ''
	};
};
