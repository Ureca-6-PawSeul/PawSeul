import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from 'src/entity/orderItem.entity';
import { OrderStateType } from 'src/types/order';
import { BaseEntity } from 'src/entity/base.entity';

@Entity()
export class Order extends BaseEntity {
  @ApiProperty({ description: '주문의 고유 ID' })
  @PrimaryGeneratedColumn()
  orderId: string;

  @ApiProperty({ description: '사용자 ID', type: () => User })
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ApiProperty({ description: '총 가격' })
  @Column()
  totalPrice: number;

  @ApiProperty({ description: '주문 상태' })
  @Column({ type: 'enum', enum: OrderStateType, default: '결제 전' })
  orderState: OrderStateType;

  @ApiProperty({ description: 'Toss 주문 키' })
  @Column()
  tossOrderKey: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  @JoinColumn({ name: 'order_id' })
  orderItems: OrderItem[];
}
