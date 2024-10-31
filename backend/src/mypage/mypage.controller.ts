import { Controller, Get, UseGuards, Req, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MypageService } from 'src/mypage/mypage.service';
import { GetUserResponseDto } from 'src/mypage/dto/getUserResponse.dto';
import { UpdatePetDto } from 'src/mypage/dto/updatePet.dto'; // DTO import
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('/api/v1/user')
export class MypageController {
  constructor(private readonly userService: MypageService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/me')
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    status: 200,
    description: 'User information retrieved successfully.',
    type: GetUserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@Req() req: Request): Promise<any> {
    // 유저 정보 로그 출력
    await this.userService.logUserInfo(req.user?.userId);

    // 펫 정보 로그 출력
    await this.userService.logPetInfo(req.user?.userId);

    return req.user; // 유저 정보를 반환
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Patch('/pet')
  async updatePet(
    @Req() req: Request,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<any> {
    await this.userService.updatePetInfo(req.user?.userId, updatePetDto);
    return { message: 'Pet information updated successfully' };
  }
}
