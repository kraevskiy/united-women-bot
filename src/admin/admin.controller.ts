import { Body, Controller, Get, Post, Render, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {
  }

  @Get()
  @Render('pages/index')
  async login(@Res() res: Response) {
    return {
      layout: 'layouts/main-layout'
    }
    // return res.render('index');
  }

  @Get('users')
  @Render('pages/users')
  async renderUsers(@Res() res: Response) {
    const users = await this.adminService.getUsers();
    return {
      layout: 'layouts/main-layout',
      users
    }
  }

  @Get('send-message')
  @Render('pages/send-message')
  async renderSendMessage(@Res() res: Response) {
    return {
      layout: 'layouts/main-layout'
    }
  }

  @Post('send-message')
  @Render('pages/send-message')
  async sendMessage(@Res() res: Response, @Body() body: { message: string }) {
    await this.adminService.createSendMessage(body);
    return {
      layout: 'layouts/main-layout',
      message: 'Sended'
    };
  }
}
