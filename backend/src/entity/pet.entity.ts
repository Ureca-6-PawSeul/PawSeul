import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Allergy } from './allergy.entity';
import { Health } from './health.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Pet extends BaseEntity {
  @ApiProperty({ description: '반려동물의 고유 ID' })
  pet_id: number;

  @ApiProperty({ description: '사용자 ID', type: () => User })
  @ManyToOne(() => User, (user) => user.pets)
  user: User;

  @ApiProperty({ description: '반려동물 이름' })
  @Column()
  petname: string;

  @ApiProperty({ description: '반려동물 나이' })
  @Column()
  age: number;

  @ApiProperty({ description: '반려동물 체중 (kg)' })
  @Column('decimal', { precision: 3, scale: 1 })
  weight: number;

  @ApiProperty({ description: '반려동물 성별' })
  @Column()
  gender: string;

  @ApiProperty({ description: '중성화 여부 (예: YES, NO)' })
  @Column()
  is_neutered: string;

  @ApiProperty({ description: '알레르기 목록' })
  @OneToMany(() => Allergy, (allergy) => allergy.pet)
  allergies: Allergy[];

  @ApiProperty({ description: '건강 기록 목록' })
  @OneToMany(() => Health, (health) => health.pet)
  healthRecords: Health[];
}
