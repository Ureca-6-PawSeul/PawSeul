import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Snack {
  @ApiProperty({ description: '간식 고유 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '간식 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '간식 카테고리' })
  @Column()
  category: string;

  @ApiProperty({ description: '간식 가격' })
  @Column('decimal')
  price: number;

  @ApiProperty({ description: '간식 이미지 URL' })
  @Column()
  product_img: string;

  @ApiProperty({ description: '상세 설명 이미지 배열' })
  @Column('json')
  description_img: string[];

  @ApiProperty({ description: '주 원재료' })
  @Column()
  main_ingredient: string;

  @ApiProperty({ description: '간식 기능' })
  @Column()
  snack_function: string;

  @ApiProperty({ description: '적정 연령' })
  @Column()
  target_age: string;

  @ApiProperty({ description: '간식 타입' })
  @Column()
  snack_type: string;

  @ApiProperty({ description: '곡물 포함 여부' })
  @Column({ type: 'boolean' })
  is_grainfree: boolean;

  @ApiProperty({ description: '대상 견종 크기' })
  @Column()
  target_size: string;
}
