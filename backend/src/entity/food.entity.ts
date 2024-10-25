import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @ApiProperty({ description: '사료 고유 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '사료 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '사료 카테고리' })
  @Column()
  category: string;

  @ApiProperty({ description: '사료 가격' })
  @Column('decimal')
  price: number;

  @ApiProperty({ description: '사료 이미지 URL' })
  @Column()
  product_img: string;

  @ApiProperty({ description: '상세 설명 이미지 배열' })
  @Column('json')
  description_img: string[];

  @ApiProperty({ description: '주 원재료' })
  @Column()
  main_ingredient: string;

  @ApiProperty({ description: '사료 기능' })
  @Column()
  food_function: string;

  @ApiProperty({ description: '적정 연령' })
  @Column()
  target_age: string;

  @ApiProperty({ description: '사료 타입' })
  @Column()
  food_type: string;

  @ApiProperty({ description: '대상 견종 크기' })
  @Column()
  target_size: string;

  @ApiProperty({ description: '곡물 포함 여부' })
  @Column({ type: 'boolean' })
  is_grainfree: boolean;
}
