import { Composer } from 'grammy';
import { BotContext } from '../../types';
import { TEXTS } from '../../helpers/texts';
import { commandConstant } from '../../helpers/command.constant';

export const subscribe = new Composer<BotContext>();

subscribe.command(commandConstant.subscribe, async (ctx: BotContext): Promise<void> => {
	await ctx.reply(TEXTS.subscribeSuccess, {
		parse_mode: 'HTML'
	});
});
