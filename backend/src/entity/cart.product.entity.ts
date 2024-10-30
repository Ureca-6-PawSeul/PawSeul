import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartProduct {
  @ApiProperty({ description: '장바구니 제품의 고유 ID' })
  @PrimaryGeneratedColumn()
  cartProductId: string;

  @ApiProperty({ description: '장바구니 ID', type: () => Cart })
  @JoinColumn({ name: 'cart_id' })
  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  cart: Cart;

  @ApiProperty({ description: '제품 ID', type: () => Product })
  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, (product) => product.productId)
  product: Product;

  @ApiProperty({ description: '제품 수량' })
  @Column()
  quantity: number;
}
