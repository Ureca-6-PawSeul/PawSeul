import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { GetUserResponseDto } from 'src/mypage/dto/getUserResponse.dto';

@Injectable()
export class MypageService {
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
}
