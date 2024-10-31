import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Pet } from './pet.entity';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Allergy extends BaseEntity {
  @ApiProperty({ description: '반려동물 ID', type: () => Pet })
  @JoinColumn({ name: 'allergies' })
  @ManyToOne(() => Pet, (pet) => pet.allergies)
  pet: Pet;

  @ApiProperty({ description: '알레르기 유형' })
  @PrimaryColumn()
  @Column()
  allergy_type: string;
}
