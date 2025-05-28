import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentAdmin } from './current-admin.decorator';
import { AdminDocument } from '../admins/schemas/admins.schema';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {
	}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	async renderLogin(
		@CurrentAdmin() admin: AdminDocument,
		@Res({ passthrough: true}) res: Response
	) {
		await this.authService.login(admin, res)
		res.redirect('/admin/')
	}

	@Get('login')
	async login(
		@Res() res: Response
	) {
		res.render('login')
	}

	@Post('refresh')
	@UseGuards(JwtRefreshAuthGuard)
	async refresh(
		@CurrentAdmin() admin: AdminDocument,
		@Res({ passthrough: true}) res: Response
	) {
		await this.authService.login(admin, res)
	}
}
