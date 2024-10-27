import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { CartProduct } from './cart.product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cart {
  @ApiProperty({ description: '장바구니의 고유 ID' })
  @PrimaryGeneratedColumn()
  cart_id: number;

  @ApiProperty({ description: '사용자 ID', type: () => User })
  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  cartProducts: CartProduct[];
}
