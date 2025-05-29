import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path'
import { ValidationPipe } from '@nestjs/common';
import { UnauthorizedExceptionFilter } from './filters/unauthorized-exception.filter';
import * as hbs from 'hbs';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'views'));
	app.setViewEngine('hbs');
	// hbs.registerPartial(join(__dirname, '..', 'views/partials'));
	hbs.registerPartials(join(__dirname, '..', 'views/partials'));

	app.useGlobalPipes(new ValidationPipe())
	app.useGlobalFilters(new UnauthorizedExceptionFilter());
	app.use(cookieParser());
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
