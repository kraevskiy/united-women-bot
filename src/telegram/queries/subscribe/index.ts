import { Composer } from 'grammy';
import { BotContext } from '../../types';
import { TEXTS } from '../../helpers/texts';
import { queryConstant } from '../../helpers/query.constant';

export const subscribe = new Composer<BotContext>();

subscribe.callbackQuery(queryConstant.subscribe, async (ctx) => {
	// console.log(ctx.update.callback_query.from);
	ctx.answerCallbackQuery();
	try {
		if (ctx.from) {
			const {id: userId, ...fields} = ctx.from;
			await ctx.userService.create({
				...fields,
				userId
			})
		}
	} catch (e) {
		console.log(e.errorResponse);
	}
	await ctx.reply(TEXTS.subscribeSuccess, {
		parse_mode: 'HTML'
	});
	ctx.callbackQuery.message?.editReplyMarkup()
	// await ctx.api.sendMessage(ctx.update.callback_query.from.id, "Hi!");
})
