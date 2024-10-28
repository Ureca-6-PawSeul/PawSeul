import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserPayload } from 'src/types/payload';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req.cookies.accessToken);
        return req.cookies.accessToken;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload) {
    if (!payload.userId)
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');

    return {
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
    };
  }
}
