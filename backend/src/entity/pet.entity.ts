import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pet {
  @ApiProperty({ description: '반려동물 고유 ID' })
  @PrimaryGeneratedColumn()
  petId: number;

  @ManyToOne(() => User, (user) => user.pets)
  @JoinColumn({ name: 'userId' }) // 통일된 외래 키 이름
  user: User;

  @ApiProperty({ description: '반려동물 이름' })
  @Column()
  petname: string;

  @ApiProperty({ description: '반려동물 나이' })
  @Column()
  age: number;

  @ApiProperty({ description: '반려동물 체중' })
  @Column()
  weight: number;

  @ApiProperty({ description: '반려동물 성별' })
  @Column()
  gender: string;

  @ApiProperty({ description: '중성화 여부' })
  @Column({ default: false })
  isNeutered: boolean;

  @ApiProperty({ description: '알레르기 정보' })
  @Column({ nullable: true })
  allergy: string;

  @ApiProperty({ description: '이전 상품 ID' })
  @Column({ nullable: true })
  prevProduct: number;
}
