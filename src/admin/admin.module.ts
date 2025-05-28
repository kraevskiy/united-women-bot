import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
