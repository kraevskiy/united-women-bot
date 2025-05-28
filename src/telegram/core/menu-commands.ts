import { BotCommand } from 'grammy/types';
import { commandConstant } from '../helpers/command.constant';

export const menuCommands: BotCommand[] = [
	{
		command: commandConstant.start,
		description: 'Запуск бота'
	},
	{
		command: commandConstant.full_info,
		description: 'Інформація про форум'
	},
	{
		command: commandConstant.subscribe,
		description: 'Прийняти участь у форумі'
	},
]
