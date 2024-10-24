import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
  @ApiProperty({ description: '주문 고유 ID' })
  @PrimaryGeneratedColumn()
  orderId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' }) // 통일된 외래 키 이름
  user: User;

  @ApiProperty({ description: '총 주문 금액' })
  @Column()
  totalPrice: number;

  @ApiProperty({ description: '주문 상태' })
  @Column()
  orderState: 'PENDING' | 'COMPLETED' | 'CANCELLED';

  @ApiProperty({ description: 'Toss 주문 키' })
  @Column()
  tossOrderKey: number;

  @ApiProperty({ description: '주문 일시' })
  @CreateDateColumn()
  orderDate: Date;
}
