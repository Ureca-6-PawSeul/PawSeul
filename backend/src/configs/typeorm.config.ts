import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
@Injectable()
export class typeORMConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT as unknown as number,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      timezone: 'Asia/Seoul',
      namingStrategy: new SnakeNamingStrategy(),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: false,
    };
  }
}
