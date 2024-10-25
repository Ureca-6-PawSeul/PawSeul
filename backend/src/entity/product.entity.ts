import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductReview } from 'src/entity/productReview.entity';
import { Category } from 'src/entity/catagory.entity';

@Entity()
export class Product {
  @ApiProperty({ description: '상품 고유 ID' })
  @PrimaryGeneratedColumn()
  productId: number;

  @ApiProperty({ description: '상품 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '상품 가격' })
  @Column()
  price: number;

  @ApiProperty({ description: '상품 이미지 URL' })
  @Column()
  productImg: string;

  @ApiProperty({ description: '상세 설명 이미지(제이슨 형식)' })
  @Column('json')
  descriptionImg: object;

  @ApiProperty({ description: '상품 생성 일시' })
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Category, (category) => category.categoryId)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => ProductReview, (review) => review.product)
  @JoinColumn({ name: 'productId' })
  reviews: ProductReview[];
}
