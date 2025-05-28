import { HydratedDocument, Schema as MSchema, WithTimestamps } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<WithTimestamps<User>>;

@Schema({timestamps: true, _id: true})
export class User {
	@Prop({required: true, unique: true, index: true})
	userId: number;

	@Prop()
	added_to_attachment_menu?: boolean;

	@Prop()
	first_name?: string;

	@Prop()
	is_bot: boolean;

	@Prop()
	is_premium?: boolean;

	@Prop()
	language_code?: string;

	@Prop()
	last_name?: string;

	@Prop()
	username?: string;

	@Prop({
		default: false
	})
	subscribed?: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(User);

// UsersSchema.index({ email: 1 }, { unique: true });
