import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ITelegramModuleAsyncOptions } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
	imports: [UsersModule],
	providers: [TelegramService],
	exports: [TelegramService]
})
export class TelegramModule {
	static forRootAsync(options: ITelegramModuleAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvider(options);

		return {
			module: TelegramModule,
			imports: options.imports,
			providers: [TelegramService, asyncOptions],
			exports: [TelegramService]
		}
	}

	private static createAsyncOptionsProvider(options: ITelegramModuleAsyncOptions): Provider {
		return {
			provide: TELEGRAM_MODULE_OPTIONS,
			useFactory: async (...args: any[]) => {
				return options.useFactory(...args);
			},
			inject: options.inject || []
		}
	}
}
