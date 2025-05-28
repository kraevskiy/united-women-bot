import { Context } from 'grammy';
import { HydrateFlavor } from '@grammyjs/hydrate';
import { UsersService } from '../users/users.service';

export type BotContext = HydrateFlavor<Context & {
	userService: UsersService
}>;
