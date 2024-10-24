import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/entity/product.entity';

@Entity()
export class Cart {
  @ManyToOne(() => Product, (product) => product.productId)
  @JoinColumn({ name: 'productId' }) // 통일된 외래 키 이름
  product: Product;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'userId' }) // 통일된 외래 키 이름
  user: User;

  @ApiProperty({ description: '장바구니에 담긴 상품 수량' })
  @Column()
  quantity: number;
}
