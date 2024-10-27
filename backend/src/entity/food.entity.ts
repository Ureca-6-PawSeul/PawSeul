import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Food extends Product {
  @ApiProperty({ description: '대상 견종 크기' })
  @Column()
  target_size: string;

  @ApiProperty({ description: '곡물 포함 여부' })
  @Column({ type: 'boolean' })
  is_grainfree: boolean;

  @ApiProperty({ description: '사료 타입' })
  @Column({
    type: 'enum',
    enum: ['건식사료', '습식사료', '수제사료', '건조생식사료', '미표기'],
    default: '미표기',
  })
  food_type: string;
}
