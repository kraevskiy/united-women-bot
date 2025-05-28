import { Composer } from 'grammy';
import { BotContext } from '../../types';
import { TEXTS } from '../../helpers/texts';
import { keyboardFullMain } from '../../core/keyboards';
import { queryConstant } from '../../helpers/query.constant';

export const fullInfo = new Composer<BotContext>();

fullInfo.callbackQuery(queryConstant.full_info, async (ctx) => {
	ctx.answerCallbackQuery();
	await ctx.reply(TEXTS.moreInfo, {
		reply_markup: keyboardFullMain,
		parse_mode: 'HTML'
	});
	ctx.callbackQuery.message?.editText(TEXTS.welcomeSecond, {
		parse_mode: 'HTML'
	})
})
