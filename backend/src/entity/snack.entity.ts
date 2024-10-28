import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Snack extends Product {
  @ApiProperty({ description: '대상 견종 크기' })
  @Column()
  targetSize: string;

  @ApiProperty({ description: '곡물 포함 여부' })
  @Column({ type: 'boolean' })
  isGrainfree: boolean;

  @ApiProperty({ description: '간식 타입' })
  @Column({
    type: 'enum',
    enum: ['캔/파우치', '건조간식', '껌/캔디', '져키', '미표기'],
    default: '미표기',
  })
  snackType: string;
}
