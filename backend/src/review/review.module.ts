import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReview } from 'src/entity/productReview.entity';
import { User } from 'src/entity/user.entity';
import { Order } from 'src/entity/order.entity';
import { Product } from 'src/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReview, User, Order, Product])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
