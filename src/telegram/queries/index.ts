import { Composer } from 'grammy';
import { BotContext } from '../types.js';
import { fullInfo } from './full_info';
import { subscribe } from './subscribe';

const callbackQuery = new Composer<BotContext>();

callbackQuery.use(fullInfo).use(subscribe)

export default callbackQuery;
