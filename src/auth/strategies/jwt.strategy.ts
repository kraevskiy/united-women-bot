import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../token-payload.interface';
import { AdminsService } from '../../admins/admins.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		configService: ConfigService,
		private readonly adminService: AdminsService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => request.cookies?.Authentication,
			]),
			secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_TOKEN_SECRET'),
		});
	}

	async validate(payload: TokenPayload) {
		return this.adminService.getAdmin({ _id: payload.adminId });
	}
}
