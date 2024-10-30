import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/entity/product.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Food {
  @ApiProperty({ description: 'Food ID' })
  @PrimaryGeneratedColumn('uuid')
  foodId: string;

  @ApiProperty({ description: 'Product ID' })
  @JoinColumn({ name: 'product' })
  @ManyToOne(() => Product, (product) => product.food)
  product: Product;

  @ApiProperty({ description: '대상 견종 크기' })
  @Column()
  targetSize: string;

  @ApiProperty({ description: '곡물 포함 여부' })
  @Column({ type: 'boolean' })
  isGrainfree: boolean;

  @ApiProperty({ description: '사료 타입' })
  @Column({
    type: 'enum',
    enum: ['건식사료', '습식사료', '수제사료', '건조생식사료', '미표기'],
    default: '미표기',
  })
  foodType: string;
}
