import { Composer } from 'grammy';
import { BotContext } from '../../types';
import { keyboardMain } from '../../core/keyboards';
import { TEXTS } from '../../helpers/texts';
import { commandConstant } from '../../helpers/command.constant';

export const start = new Composer<BotContext>();

start.command(commandConstant.start, async (ctx: BotContext): Promise<void> => {
	await ctx.reply(TEXTS.welcome, {
		reply_markup: keyboardMain,
		parse_mode: 'HTML'
	});
});
