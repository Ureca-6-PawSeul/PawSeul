import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CartProduct {
  @ApiProperty({ description: '장바구니 제품의 고유 ID' })
  @PrimaryGeneratedColumn()
  cartProductId: string;

  @ApiProperty({ description: '제품 ID', type: () => Product })
  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, (product) => product.cartProducts, { eager: true }) // eager: true를 추가하여 자동으로 Product 정보를 가져올 수 있습니다.
  product: Product;

  @ApiProperty({ description: '제품 수량' })
  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
