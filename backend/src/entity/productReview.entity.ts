import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/entity/product.entity';

@Entity()
export class ProductReview {
  @ApiProperty({ description: '리뷰 고유 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'productId' }) // 통일된 외래 키 이름
  product: Product;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' }) // 통일된 외래 키 이름
  user: User;

  @ApiProperty({ description: '리뷰 내용' })
  @Column()
  text: string;

  @ApiProperty({ description: '리뷰 작성 일시' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: '리뷰 점수' })
  @Column()
  score: number;
}
