import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MypageService } from 'src/mypage/mypage.service';
import { MypageController } from 'src/mypage/mypage.controller';
import { Pet } from 'src/entity/pet.entity';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pet])],
  providers: [MypageService, UserService],
  controllers: [MypageController],
})
export class MypageModule {}
