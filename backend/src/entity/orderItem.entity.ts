import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/entity/product.entity';

@Entity()
export class OrderItem {
  @ApiProperty({ description: '주문 항목 고유 ID' })
  @PrimaryGeneratedColumn()
  orderItemId: number;

  @ApiProperty({ description: '주문 아이디' })
  @ManyToOne(() => Order, (order) => order.orderId)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ApiProperty({ description: '상품 아이디' })
  @ManyToOne(() => Product, (product) => product.productId)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ApiProperty({ description: '주문 수량' })
  @Column()
  quantity: number;
}
