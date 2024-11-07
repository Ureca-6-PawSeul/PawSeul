import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/entity/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RecommandProduct {
  @ApiProperty({ description: '물품 고유 ID', type: () => Product })
  @IsNotEmpty()
  @OneToOne(() => Product, (product) => product.productId, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ApiProperty({ description: '추천 물품 고유 ID' })
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  recommandProductId: string;
  //   @ApiProperty({ description: '물품 이름' })
  //   @IsNotEmpty()
  //   @Column()
  //   title: string;

  @ApiProperty({ description: '칼로리' })
  @IsNotEmpty()
  @Column()
  cal: number;

  @ApiProperty({ description: '탄수화물' })
  @IsNotEmpty()
  @Column()
  carbon: number;

  @ApiProperty({ description: '지방' })
  @IsNotEmpty()
  @Column()
  fat: number;

  @ApiProperty({ description: '단백질' })
  @IsNotEmpty()
  @Column()
  protein: number;

  @ApiProperty({ description: '칼슘' })
  @IsNotEmpty()
  @Column()
  calcium: number;

  @ApiProperty({ description: '비타민 A' })
  @IsNotEmpty()
  @Column()
  vitaminA: number;

  @ApiProperty({ description: '비타민 D' })
  @IsNotEmpty()
  @Column()
  vitaminD: number;

  @ApiProperty({ description: '비타민 E' })
  @IsNotEmpty()
  @Column()
  vitaminE: number;
}
