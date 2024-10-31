import { Controller, Get, UseGuards, Req, Body, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MypageService } from 'src/mypage/mypage.service';
import { GetUserResponseDto } from 'src/mypage/dto/getUserResponse.dto';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Pet } from 'src/entity/pet.entity';
import { UpdatePetRequestDto } from 'src/mypage/dto/updatePetRequest.dto';

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
    status: 200,
    description: 'Pet information updated successfully.',
    type: Pet,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  async updatePetInfo(
    @Req() req: Request,
    @Body() updatePetDto: UpdatePetRequestDto,
  ): Promise<Pet> {
    const userId = req.user?.userId;
    return this.userService.updatePetInfo(userId, updatePetDto);
  }
}
