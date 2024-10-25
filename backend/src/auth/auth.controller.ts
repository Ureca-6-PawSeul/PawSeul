import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @ApiOperation({ summary: '카카오 로그인' })
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
      return res.redirect('http://localhost:5173/');
    }

    //홈페이지
    return res.redirect('http://localhost:5173/login');
  }
}
