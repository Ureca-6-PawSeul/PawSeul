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
export class ProductReview {
  @ApiProperty({ description: '리뷰의 고유 ID' })
  @PrimaryGeneratedColumn()
  productReviewId: string;

  @ApiProperty({ description: '제품 ID', type: () => Product })
  @JoinColumn({ name: 'product_id' })
  @ManyToOne(() => Product, (product) => product.productId, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ApiProperty({ description: '사용자 ID', type: () => User })
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ApiProperty({ description: '리뷰 내용' })
  @Column()
  text: string;

  @ApiProperty({ description: '리뷰 점수 (1~5)' })
  @Column()
  score: number;
}
