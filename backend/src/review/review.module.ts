import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview } from 'src/entity/productReview.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReview])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
