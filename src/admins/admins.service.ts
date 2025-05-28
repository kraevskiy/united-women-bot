import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admins.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateAdminRequest } from './dto/create-admin.request';
import { hash } from 'bcryptjs';

@Injectable()
export class AdminsService {
	constructor(@InjectModel(Admin.name) private readonly adminModel: Model<Admin>) {
	}

	async createAdmin(body: CreateAdminRequest) {
		await new this.adminModel({
			...body,
			password: await hash(body.password, 15)
		}).save()
	}

	async getAdmin(query: FilterQuery<Admin>) {
		const user = await this.adminModel.findOne(query).exec();
		if (!user) {
			throw new NotFoundException('User not found')
		}
		return user;
	}

	async getAll() {
		return this.adminModel.find({})
	}

	async updateAdmin(query: FilterQuery<Admin>, data: UpdateQuery<Admin>) {
		return this.adminModel.findOneAndUpdate(query, data)
	}
}
