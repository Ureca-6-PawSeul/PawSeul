import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserPayload } from 'src/types/payload';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(userPayload: UserPayload): string {
    const payload = {
      userId: userPayload.userId,
      email: userPayload.email,
      username: userPayload.username,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  generateRefreshToken(userPayload: UserPayload): string {
    const payload = {
      userId: userPayload.userId,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  async getJWTs(userPayload: UserPayload) {
    const accessToken = this.generateAccessToken(userPayload);
    const refreshToken = this.generateRefreshToken(userPayload);

    return { accessToken, refreshToken };
  }

  async getAccessToken(userPayload: UserPayload) {
    return this.generateAccessToken(userPayload);
  }

  async getRefreshToken(userPayload: UserPayload) {
    return this.generateRefreshToken(userPayload);
  }

  // 카카오 로그인한 유저 정보를 DB에 저장
  async registerKakaoUser(userPayload: UserPayload): Promise<User> {
    const { userId, username, email } = userPayload;
    const newUser = this.usersRepository.create({
      userId,
      username,
      email,
    });
    return await this.usersRepository.save(newUser);
  }

  // 중복 유저 등록 예외 처리
  async validateUser(userPayload: UserPayload): Promise<boolean> {
    const { userId } = userPayload;
    const user = await this.usersRepository.findOneBy({ userId });

    if (!user) {
      // 사용자 정보가 존재하지 않으면 새로 등록
      await this.registerKakaoUser(userPayload);
      return false; // 새로 가입된 사용자임을 표시
    }

    return true; // 기존 사용자임을 표시
  }
}
