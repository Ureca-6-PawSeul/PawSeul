import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
