import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { Health } from 'src/entity/health.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/entity/pet.entity';
// import { HealthInitService } from 'src/health/init/healthInit.service';
import { Product } from 'src/entity/product.entity';
import { RecommendProduct } from 'src/entity/recommendProduct.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Health, Pet, Product, RecommendProduct, User]),
  ],
  controllers: [HealthController],
  providers: [
    HealthService,
    // HealthInitService
  ],
})
export class HealthModule {}
