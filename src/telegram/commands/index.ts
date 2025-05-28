import { Composer } from 'grammy';
import { BotContext } from '../types';
import { start } from './start';
import { subscribe } from './subscribe';
import { fullInfo } from './full_info';

const commands = new Composer<BotContext>();

commands
	.use(start)
	.use(subscribe)
	.use(fullInfo);

export default commands;
