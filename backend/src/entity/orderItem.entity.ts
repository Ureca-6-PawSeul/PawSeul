import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OrderItem {
  @ApiProperty({ description: '주문 항목의 고유 ID' })
  @PrimaryGeneratedColumn()
  orderItemId: string;

  @ApiProperty({ description: '주문 ID', type: () => Order })
  @JoinColumn({ name: 'order_id' })
  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ApiProperty({ description: '제품 ID', type: () => Product })
  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, (product) => product.productId)
  product: Product;

  @ApiProperty({ description: '제품 수량' })
  @Column()
  quantity: number;

  @ApiProperty({ description: '제품 가격' })
  @Column()
  price: number;
}
