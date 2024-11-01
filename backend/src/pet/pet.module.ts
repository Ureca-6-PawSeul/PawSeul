import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { User } from 'src/entity/user.entity';
import { Pet } from 'src/entity/pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
