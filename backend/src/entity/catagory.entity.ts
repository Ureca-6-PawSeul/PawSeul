import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Category {
  @ApiProperty({ description: '카테고리 고유 ID' })
  @PrimaryGeneratedColumn()
  categoryId: number;

  @ApiProperty({ description: '카테고리 이름' })
  @Column()
  category_name: string;

  @ApiProperty({ description: '부모 카테고리 ID' })
  @Column({ nullable: true })
  parentId: number;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
