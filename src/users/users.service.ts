import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
	}

	async create(user: User) {
		return this.userModel.create(user);
	}

	async getAll() {
		return this.userModel.find({});
	}
}
