import { Composer } from 'grammy';
import { BotContext } from '../../types';
import { keyboardMain } from '../../core/keyboards';
import { TEXTS } from '../../helpers/texts';
import { commandConstant } from '../../helpers/command.constant';

export const start = new Composer<BotContext>();

start.command(commandConstant.start, async (ctx: BotContext): Promise<void> => {
	console.log(ctx);
	console.log(ctx.from);
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

	await ctx.reply(TEXTS.welcome, {
		reply_markup: keyboardMain,
		parse_mode: 'HTML'
	});
});
