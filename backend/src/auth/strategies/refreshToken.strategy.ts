import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from 'src/types/payload';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET, // refresh token은 다른 secret key를 사용할 수 있음
    });
  }

  async validate(payload: UserPayload) {
    const { userId } = payload;
    if (!userId) throw new UnauthorizedException('Invalid refreshToken');

    return true;
  }
}
