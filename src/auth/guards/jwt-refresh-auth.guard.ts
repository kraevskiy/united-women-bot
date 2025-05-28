import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}
