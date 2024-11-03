import { Controller, Get, UseGuards, Req, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MypageService } from 'src/mypage/mypage.service';
import { GetUserResponseDto } from 'src/mypage/dto/getUserResponse.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Pet } from 'src/entity/pet.entity';
import { UpdatePetRequestDto } from 'src/mypage/dto/updatePetRequest.dto';

@Controller('/user')
@ApiTags('마이페이지 api')
export class MypageController {
  constructor(private readonly userService: MypageService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get('/me')
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    description: '사용자 정보 조회 성공',
    type: GetUserResponseDto,
  })
  async getMe(@Req() req: Request): Promise<GetUserResponseDto> {
    const userId = req.user?.userId;

    // 유저 정보 로그 출력
    await this.userService.logUserInfo(req.user?.userId);

    // 펫 정보 로그 출력
    await this.userService.logPetInfo(req.user?.userId);

    return this.userService.findUserById(userId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Patch('/me/pet')
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    description: '펫 정보 수정 성공',
    type: Pet,
  })
  async updatePetInfo(
    @Req() req: Request,
    @Body() updatePetDto: UpdatePetRequestDto,
  ): Promise<Pet> {
    const userId = req.user?.userId;
    return this.userService.updatePetInfo(userId, updatePetDto);
  }
}
