import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Pet } from './pet.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ProductReview } from 'src/entity/productReview.entity';
import { CartProduct } from './cart.product.entity'; // CartProduct 엔티티를 가져옵니다.

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

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.user) // CartProduct와의 관계를 추가합니다.
  cartProducts: CartProduct[];

  @OneToOne(() => Pet, (pet) => pet.user)
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;
}
