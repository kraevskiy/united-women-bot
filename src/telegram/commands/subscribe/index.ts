import { Composer } from 'grammy';
import { BotContext } from '../../types';
import { TEXTS } from '../../helpers/texts';
import { commandConstant } from '../../helpers/command.constant';

export const subscribe = new Composer<BotContext>();

subscribe.command(commandConstant.subscribe, async (ctx: BotContext): Promise<void> => {
	try {
		if (ctx.from) {
			const {id: userId, ...fields} = ctx.from;
			await ctx.userService.create({
				...fields,
				userId
			})
		}
	} catch (e) {
		console.log(e);
	}
	await ctx.reply(TEXTS.subscribeSuccess, {
		parse_mode: 'HTML'
	});

});
