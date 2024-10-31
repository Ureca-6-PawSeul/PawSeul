import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/entity/product.entity';
import { FoodType } from 'src/types/category';
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
    enum: FoodType,
    default: '미표기',
  })
  foodType: FoodType;
}
