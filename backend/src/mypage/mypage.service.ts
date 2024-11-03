import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { Pet } from 'src/entity/pet.entity';
import { UpdatePetRequestDto } from 'src/mypage/dto/updatePetRequest.dto';

@Injectable()
export class MypageService {
  private readonly logger = new Logger(MypageService.name);

  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  // 펫 정보 조회
  async getPetInfo(userId: string): Promise<Pet> {
    const user = await this.entityManager.findOne(User, {
      where: { userId: userId },
      relations: ['pet'],
    });

    if (!user || !user.pet) {
      throw new NotFoundException('펫 정보를 찾을 수 없습니다.');
    }

    return user.pet;
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
