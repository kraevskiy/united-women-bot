import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { CreateAdminRequest } from './dto/create-admin.request';
import { AdminsService } from './admins.service';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admins')
export class AdminsController {
	constructor(private readonly adminsService: AdminsService) {
	}
	@Get('create')
	async createPageAdmin(@Res() res: Response) {
		return res.render('create-admin');
	}

	@Post('create')
	async createAdmin(@Body() body: CreateAdminRequest) {
		await this.adminsService.createAdmin(body);
	}

	@Get()
	@UseGuards(JwtAuthGuard)
	async getAll() {
		return this.adminsService.getAll();
	}
}
