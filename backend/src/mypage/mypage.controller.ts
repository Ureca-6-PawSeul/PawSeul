import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MypageService } from 'src/mypage/mypage.service';
import { GetUserResponseDto } from 'src/mypage/dto/getUserResponse.dto';

@Controller('api/v1/user')
export class MypageController {
  constructor(private readonly userService: MypageService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('me')
  async getMe(@Req() req): Promise<GetUserResponseDto> {
    const userId = req.user.userId;
    return this.userService.findUserById(userId);
  }
}
