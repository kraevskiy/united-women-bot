import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminsSchema } from './schemas/admins.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminsSchema
      }
    ])
  ],
  providers: [AdminsService],
  controllers: [AdminsController],
  exports: [AdminsService]
})
export class AdminsModule {}
