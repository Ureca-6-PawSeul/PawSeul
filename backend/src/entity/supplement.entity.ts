import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

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
    enum: ['캡슐', '알약', '스틱', '츄어블', '분말', '미표기'],
    default: '미표기',
  })
  supplementType: string;
}
