import {
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('인증/로그인 관련 api')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @ApiOperation({ summary: '카카오 로그인' })
  @ApiCookieAuth('accessToken')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    this.logger.log('kakaoLogin');
    this.logger.log(req.user);

    const { accessToken, refreshToken } = await this.authService.getJWTs(
      req.user,
    );
    const isSignup = await this.authService.validateUser(req.user);

    res.setHeader('Authorization', `Bearer ${refreshToken}`);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    if (!isSignup) {
      // 정보 등록 페이지
      return res.redirect(
        `${process.env.FRONTEND_URL || 'http://localhost:3000'}/signup`,
      );
    }

    this.logger.log('카카오 API');

    //홈페이지
    return res.redirect(
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}`,
    );
  }

  @Post('logout')
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: '로그아웃' })
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.send('logout');
  }
}
