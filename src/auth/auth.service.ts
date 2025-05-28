import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { compare, hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from '../admins/schemas/admins.schema';
import { Response } from 'express';
import { TokenPayload } from './token-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly adminsService: AdminsService,
		private readonly configService: ConfigService,
		private readonly jwtService: JwtService,
	) {
	}

	async login(admin: AdminDocument, response: Response) {
		const expAT = new Date();
		expAT.setMilliseconds(
			expAT.getTime() + parseInt(this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS'))
		);

		const expRF = new Date();
		expRF.setMilliseconds(
			expRF.getTime() + parseInt(this.configService.getOrThrow('JWT_ACCESS_REFRESH_TOKEN_EXPIRATION_MS'))
		);

		const tokenPayload: TokenPayload = {
			adminId: admin._id.toHexString()
		}

		const accT = this.jwtService.sign(tokenPayload, {
			secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
			expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`
		})

		const refT = this.jwtService.sign(tokenPayload, {
			secret: this.configService.getOrThrow('JWT_ACCESS_REFRESH_TOKEN_SECRET'),
			expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_REFRESH_TOKEN_EXPIRATION_MS')}ms`
		})

		await this.adminsService.updateAdmin({
			_id: admin._id
		}, {
			$set: {
				refreshToken: await hash(refT, 10)
			}
		})

		response.cookie('Authentication', accT, {
			httpOnly: true,
			secure: this.configService.get('NODE_ENV') === 'production',
			expires: expAT
		})

		response.cookie('Refresh', refT, {
			httpOnly: true,
			secure: this.configService.get('NODE_ENV') === 'production',
			expires: expRF
		})
	}

	async verifyUser(email: string, password: string) {
		try {
			const admin = await this.adminsService.getAdmin({
				email
			})
			const authenticated = await compare(password, admin.password);
			if (!authenticated) {
				throw new UnauthorizedException()
			}
			return admin;
		} catch (e) {
			throw new UnauthorizedException('Credential not valid')
		}
	}

	async verifyAdminRefreshToken(refreshToken: string, adminId: string) {
		try {
			const admin = await this.adminsService.getAdmin({ _id: adminId });
			const authenticated = await compare(
				refreshToken,
				admin.refreshToken ?? '',
			);
			if (!authenticated) {
				throw new UnauthorizedException();
			}

			return admin;
		} catch (e) {
			throw new UnauthorizedException('Refresh token is not found');
		}
	}
}
