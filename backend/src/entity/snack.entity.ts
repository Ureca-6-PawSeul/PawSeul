import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SnackType } from 'src/types/category';
import { Product } from 'src/entity/product.entity';

@Entity()
export class Snack {
  @ApiProperty({ description: 'Snack ID' })
  @PrimaryGeneratedColumn('uuid')
  snackId: string;

  @ApiProperty({ description: 'Product ID' })
  @JoinColumn({ name: 'product' })
  @ManyToOne(() => Product, (product) => product.snack)
  product: Product;

  @ApiProperty({ description: '대상 견종 크기' })
  @Column()
  targetSize: string;

  @ApiProperty({ description: '곡물 포함 여부' })
  @Column({ type: 'boolean' })
  isGrainfree: boolean;

  @ApiProperty({ description: '간식 타입' })
  @Column({
    type: 'enum',
    enum: SnackType,
    default: '미표기',
  })
  snackType: SnackType;
}
