import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { Pet } from './pet.entity';

import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/entity/order.entity';
import { ProductReview } from 'src/entity/productReview.entity';
import { Cart } from 'src/entity/cart.entity';

@Entity()
export class User {
  @ApiProperty({ description: '사용자 고유 ID' })
  @PrimaryGeneratedColumn()
  userId: string;

  @ApiProperty({ description: '사용자 이름' })
  @Column()
  username: string;

  @ApiProperty({ description: '사용자 이메일' })
  @Column()
  email: string;

  @ApiProperty({ description: '계정 생성 일시' })
  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @OneToMany(() => ProductReview, (review) => review.user)
  reviews: ProductReview[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];
}
