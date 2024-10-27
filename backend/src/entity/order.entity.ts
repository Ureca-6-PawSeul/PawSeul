import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './orderitem.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty({ description: '주문의 고유 ID' })
  @PrimaryGeneratedColumn()
  order_id: number;

  @ApiProperty({ description: '사용자 ID', type: () => User })
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ApiProperty({ description: '총 가격' })
  @Column()
  total_price: number;

  @ApiProperty({ description: '주문 상태' })
  @Column()
  order_state: string;

  @ApiProperty({ description: 'Toss 주문 키' })
  @Column()
  toss_order_key: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
