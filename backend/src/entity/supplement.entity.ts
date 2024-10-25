import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @ApiProperty({ description: '영양제 고유 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '영양제 제목' })
  @Column()
  title: string;

  @ApiProperty({ description: '영양제 카테고리' })
  @Column()
  category: string;

  @ApiProperty({ description: '영양제 가격' })
  @Column('decimal')
  price: number;

  @ApiProperty({ description: '영양제 이미지 URL' })
  @Column()
  product_img: string;

  @ApiProperty({ description: '상세 설명 이미지 배열' })
  @Column('json')
  description_img: string[];

  @ApiProperty({ description: '주 원재료' })
  @Column()
  main_ingredient: string;

  @ApiProperty({ description: '영양제 기능' })
  @Column()
  supplement_function: string;

  @ApiProperty({ description: '적정 연령' })
  @Column()
  target_age: string;

  @ApiProperty({ description: '영양제 타입' })
  @Column()
  supplement_type: string;
}
