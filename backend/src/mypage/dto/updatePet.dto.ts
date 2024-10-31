import { ApiProperty } from '@nestjs/swagger';

export class UpdatePetDto {
  @ApiProperty({ description: '반려동물 이름', required: false })
  petname?: string;

  @ApiProperty({ description: '반려동물 나이', required: false })
  age?: number;

  @ApiProperty({ description: '반려동물 체중 (kg)', required: false })
  weight?: number;

  @ApiProperty({ description: '반려동물 성별', required: false })
  gender?: string;

  @ApiProperty({ description: '중성화 여부 (예: YES, NO)', required: false })
  isNeutered?: string;

  @ApiProperty({ description: '반려동물 품종', required: false })
  breed?: string;
}
