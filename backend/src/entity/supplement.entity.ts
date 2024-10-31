import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { SupplementType } from 'src/types/category';

@Entity()
export class Supplement {
  @ApiProperty({ description: 'Supplement ID' })
  @PrimaryGeneratedColumn('uuid')
  supplementId: string;

  @ApiProperty({ description: 'Product ID' })
  @JoinColumn({ name: 'product' })
  @ManyToOne(() => Product, (product) => product.supplement)
  product: Product;

  @ApiProperty({ description: '영양제 타입' })
  @Column({
    type: 'enum',
    enum: SupplementType,
    default: '미표기',
  })
  supplementType: SupplementType;
}
