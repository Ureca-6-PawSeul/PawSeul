import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { ProductReview } from 'src/entity/productReview.entity';
import { Order } from 'src/entity/order.entity';
import { OrderItem } from 'src/entity/orderItem.entity';
import { User } from 'src/entity/user.entity';
import { CartProduct } from 'src/entity/cart.product.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductReview,
      Order,
      OrderItem,
      User,
      CartProduct,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
