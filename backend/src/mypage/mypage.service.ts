import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Pet } from 'src/entity/pet.entity';
import { GetUserResponseDto } from 'src/mypage/dto/getUserResponse.dto';
import { UpdatePetRequestDto } from 'src/mypage/dto/updatePetRequest.dto';

@Injectable()
export class MypageService {
  private readonly logger = new Logger(MypageService.name);

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findUserById(userId: string): Promise<GetUserResponseDto> {
    const user = await this.entityManager.findOne(User, {
      where: { userId: userId },
      relations: ['pet'],
    });

    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return {
      userId: user.userId,
      username: user.username,
      email: user.email,
      pet: user.pet,
    };
  }

  async logUserInfo(userId: string): Promise<void> {
    const user = await this.findUserById(userId);
    this.logger.log(`유저 정보: ${JSON.stringify(user)}`);
  }

  async logPetInfo(userId: string): Promise<void> {
    const user = await this.entityManager.findOne(User, {
      where: { userId: userId },
      relations: ['pet'],
    });

    if (!user || !user.pet) {
      this.logger.warn(`펫 정보가 없습니다.: ${userId}`);
      return;
    }

    this.logger.log(`펫 정보: ${JSON.stringify(user.pet)}`);
  }

  //펫 정보 수정
  async updatePetInfo(
    userId: string,
    updatePetDto: UpdatePetRequestDto,
  ): Promise<Pet> {
    const user = await this.entityManager.findOne(User, {
      where: { userId: userId },
      relations: ['pet'],
    });

    if (!user || !user.pet) {
      throw new NotFoundException('펫 정보를 찾을 수 없습니다.');
    }

    Object.assign(user.pet, updatePetDto);
    await this.entityManager.save(user.pet);

    return user.pet;
  }
}
