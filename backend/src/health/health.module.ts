import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { Health } from 'src/entity/health.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from 'src/entity/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Health, Pet])],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
