import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MypageService } from 'src/mypage/mypage.service';
import { MypageController } from 'src/mypage/mypage.controller';
import { Pet } from 'src/entity/pet.entity';
import { User } from 'src/entity/user.entity';
import { AccessTokenStrategy } from 'src/auth/strategies/accessToken.strategy';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([User, Pet])],
  providers: [MypageService, AccessTokenStrategy, JwtService],
  controllers: [MypageController],
})
export class MypageModule {}
