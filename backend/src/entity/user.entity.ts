import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProductReview } from './productreview.entity';
import { Cart } from './cart.entity';
import { Order } from './order.entity';
import { Pet } from './pet.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ description: '사용자의 고유 ID' })
  @PrimaryGeneratedColumn()
  userId: string;

  @ApiProperty({ description: '사용자 이름' })
  @Column()
  username: string;

  @ApiProperty({ description: '사용자 이메일' })
  @Column()
  email: string;

  @OneToMany(() => ProductReview, (review) => review.user)
  reviews: ProductReview[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];
}
