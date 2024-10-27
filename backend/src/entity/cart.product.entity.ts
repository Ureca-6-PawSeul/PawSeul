import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartProduct {
  @ApiProperty({ description: '장바구니 제품의 고유 ID' })
  @PrimaryGeneratedColumn()
  cart_product_id: number;

  @ApiProperty({ description: '장바구니 ID', type: () => Cart })
  @ManyToOne(() => Cart, (cart) => cart.cartProducts)
  cart: Cart;

  @ApiProperty({ description: '제품 ID', type: () => Product })
  @ManyToOne(() => Product, (product) => product.product_id)
  product: Product;

  @ApiProperty({ description: '제품 수량' })
  @Column()
  quantity: number;
}
