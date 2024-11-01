import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pet } from 'src/entity/pet.entity';
import { User } from 'src/entity/user.entity';
import { CreatePetDto } from 'src/pet/dto/createPet.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createAndUpdatePet(userId: string, createPetDto: CreatePetDto) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) {
      throw new Error('사용자를 찾을 수 없습니다.');
    }
    let pet = await this.petRepository.findOneBy({ user: { userId } });

    if (pet) {
      this.petRepository.merge(pet, createPetDto);
    } else {
      pet = this.petRepository.create({
        ...createPetDto,
        user,
      });
    }

    const savedPet = await this.petRepository.save(pet);

    user.pet = savedPet;
    await this.userRepository.save(user);

    return savedPet;
  }
}
