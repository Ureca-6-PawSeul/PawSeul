import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePetDto } from 'src/pet/dto/createPet.dto';
import { ApiBody, ApiCookieAuth } from '@nestjs/swagger';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiBody({
    type: CreatePetDto,
  })
  @Post('/')
  async createPet(@Req() req: Request, @Body() createPetDto: CreatePetDto) {
    try {
      const userId = req.user?.userId;
      return await this.petService.createAndUpdatePet(userId, createPetDto);
    } catch (error) {
      throw new HttpException(
        error.message || '펫 생성에 실패했습니다.',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
