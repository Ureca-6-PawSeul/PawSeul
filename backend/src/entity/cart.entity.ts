import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CartProduct } from './cart.product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cart {
  @ApiProperty({ description: '장바구니의 고유 ID' })
  @PrimaryGeneratedColumn()
  cartId: string;

  @ApiProperty({ description: '사용자 ID', type: () => User })
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  cartProducts: CartProduct[];
}
