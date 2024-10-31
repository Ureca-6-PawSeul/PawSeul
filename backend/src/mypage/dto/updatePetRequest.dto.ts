import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetRequestDto {
  @ApiProperty({ description: '반려동물 이름' })
  petname?: string;

  @ApiProperty({ description: '반려동물 나이' })
  age?: number;

  @ApiProperty({ description: '반려동물 체중 (kg)' })
  weight?: number;

  @ApiProperty({ description: '반려동물 성별' })
  gender?: string;

  @ApiProperty({ description: '중성화 여부 (예: YES, NO)' })
  isNeutered?: string;

  @ApiProperty({ description: '반려동물 품종' })
  breed?: string;
}
