import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from './order.entity';
import { Pet } from './pet.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductReview } from 'src/entity/productReview.entity';

@Entity()
export class User {
  @ApiProperty({ description: '사용자의 고유 ID' })
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @ApiProperty({ description: '사용자 이름' })
  @Column()
  username: string;

  @ApiProperty({ description: '사용자 이메일' })
  @Column({ unique: true })
  email: string;

  @OneToMany(() => ProductReview, (review) => review.user)
  reviews: ProductReview[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Pet, (pet) => pet.user, { cascade: true })
  @JoinColumn()
  pet: Pet;
}
