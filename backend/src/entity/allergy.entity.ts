import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pet } from './pet.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Allergy {
  @ApiProperty({ description: '알레르기 고유 ID' })
  @PrimaryGeneratedColumn()
  allergyId: number;

  @ApiProperty({ description: '반려동물 ID', type: () => Pet })
  @ManyToOne(() => Pet, (pet) => pet.allergies)
  pet: Pet;

  @ApiProperty({ description: '알레르기 설명 (제이슨 형식)' })
  @Column('json')
  description: object;
}
