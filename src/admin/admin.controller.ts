import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {
	}

	@Get()
	async login(@Res() res: Response) {
		return res.render('home');
	}

	@Get('send-message')
	async renderSendMessage(@Res() res: Response) {
		return res.render('send-message');
	}

	@Post('send-message')
	async sendMessage(@Res() res: Response, @Body() body: {message: string}) {
		await this.adminService.createSendMessage(body)
		return res.render('send-message', {message: 'done'})
	}
}
