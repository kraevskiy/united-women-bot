import { HydratedDocument, Schema as MSchema, WithTimestamps } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type AdminDocument = HydratedDocument<WithTimestamps<Admin>>;

@Schema({timestamps: true, _id: true})
export class Admin {

	@Prop({unique: true})
	email: string;

	@Prop()
	password: string;

	@Prop()
	refreshToken?: string;
}

export const AdminsSchema = SchemaFactory.createForClass(Admin);

// AdminsSchema.index({ email: 1 }, { unique: true });
