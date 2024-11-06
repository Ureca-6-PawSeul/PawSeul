import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HealthService } from './health.service';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AiHealthRequestDto } from 'src/health/dto/aiHealthRequest.dto';
import { AiHealthResponseDto } from 'src/health/dto/aiHealthReponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('health')
@ApiTags('건강 api')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post('/ai')
  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: 'AI 건강 진단' })
  @ApiCreatedResponse({
    status: 201,
    description: 'AI 건강 진단 성공',
    type: AiHealthResponseDto,
  })
  async aiHealth(
    @Req() req: Request,
    @Body() aiHealthRequestDto: AiHealthRequestDto,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }
    return await this.healthService.aiHealth(aiHealthRequestDto);
  }
}
