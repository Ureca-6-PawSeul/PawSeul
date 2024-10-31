import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { GetUserResponseDto } from 'src/mypage/dto/getUserResponse.dto';
import { UpdatePetDto } from 'src/mypage/dto/updatePet.dto';

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
      throw new NotFoundException('User not found');
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
    this.logger.log(`User Info: ${JSON.stringify(user)}`);
  }

  async logPetInfo(userId: string): Promise<void> {
    const user = await this.entityManager.findOne(User, {
      where: { userId: userId },
      relations: ['pet'],
    });

    if (!user || !user.pet) {
      this.logger.warn(`No pet found for user ID: ${userId}`);
      return;
    }

    this.logger.log(`Pet Info: ${JSON.stringify(user.pet)}`);
  }

  async updatePetInfo(
    userId: string,
    updatePetDto: UpdatePetDto,
  ): Promise<void> {
    const user = await this.entityManager.findOne(User, {
      where: { userId: userId },
      relations: ['pet'],
    });

    if (!user || !user.pet) {
      throw new NotFoundException('Pet not found');
    }

    // 반려동물 정보 업데이트
    Object.assign(user.pet, updatePetDto);
    await this.entityManager.save(user.pet);
    this.logger.log(`Updated Pet Info: ${JSON.stringify(user.pet)}`);
  }
}
