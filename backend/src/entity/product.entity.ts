import { ApiProperty } from '@nestjs/swagger';
import { Food } from 'src/entity/food.entity';
import { Snack } from 'src/entity/snack.entity';
import { Supplement } from 'src/entity/supplement.entity';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @ApiProperty({ description: '제품 고유 ID' })
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @ApiProperty({ description: '제품 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '제품 카테고리' })
  @Column()
  category: string;

  @ApiProperty({ description: '제품 가격' })
  @Column()
  price: number;

  @ApiProperty({ description: '제품 이미지 URL' })
  @Column()
  product_img: string;

  @ApiProperty({ description: '상세 설명 이미지 배열' })
  @Column('json')
  descriptionImg: string[];

  @ApiProperty({ description: '주 원재료' })
  @Column()
  mainIngredient: string;

  @ApiProperty({ description: '제품 기능' })
  @Column()
  productFunction: string;

  @ApiProperty({ description: '적정 연령' })
  @Column()
  targetAge: string;

  @ApiProperty({ description: '평균 점수' })
  @Column('decimal', { precision: 2, scale: 1 })
  averageScore: number;

  @OneToMany(() => Food, (food) => food.product)
  food?: Food[];

  @OneToMany(() => Supplement, (supplement) => supplement.product)
  supplement?: Supplement[];

  @OneToMany(() => Snack, (snack) => snack.product)
  snack?: Snack[];
}
