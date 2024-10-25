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

  async validateUser(userPayload: UserPayload): Promise<boolean> {
    const { userId } = userPayload;
    const user: User = await this.usersRepository.findOneBy({ userId }); // 유저 조회

    return !!user;
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
}
