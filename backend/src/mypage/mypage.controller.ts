import { Controller, Get, UseGuards, Req, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MypageService } from 'src/mypage/mypage.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Pet } from 'src/entity/pet.entity';
import { UpdatePetRequestDto } from 'src/mypage/dto/updatePetRequest.dto';

@Controller('/user')
@ApiTags('마이페이지 api')
export class MypageController {
  constructor(private readonly userService: MypageService) {}

  // 펫 정보 조회
  @UseGuards(AuthGuard('jwt-access'))
  @Get('/me/pet')
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    description: '펫 정보 조회 성공.',
    type: Pet,
  })
  async getPetInfo(@Req() req: Request): Promise<Pet> {
    const userId = req.user?.userId;
    return this.userService.getPetInfo(userId);
  }

  // 펫 정보 업데이트
  @UseGuards(AuthGuard('jwt-access'))
  @Patch('/me/pet')
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    description: '펫 정보가 성공적으로 업데이트되었습니다.',
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
