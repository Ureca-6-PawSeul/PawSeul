import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('유저 관련 api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/info')
  @ApiOperation({ summary: '유저 정보 가져오기' })
  @UseGuards(AuthGuard('jwt-access'))
  async getUserInfo(@Req() req: Request) {
    const { userId } = req.user;
    return this.userService.getUserInfo(userId);
  }
}
