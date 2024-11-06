import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  IsEnum,
} from 'class-validator';

enum NeuteredStatus {
  YES = 'yes',
  NO = 'no',
}

export class UpdatePetRequestDto {
  @ApiProperty({ description: '반려동물 이름' })
  @IsOptional()
  @IsString()
  petname?: string;

  @ApiProperty({ description: '반려동물 나이' })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({ description: '반려동물 체중 (kg)' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 1 })
  weight?: number;

  @ApiProperty({ description: '반려동물 성별' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ description: '중성화 여부 (예: YES, NO)' })
  @IsOptional()
  @IsEnum(NeuteredStatus)
  isNeutered?: string;

  @ApiProperty({ description: '반려동물 품종' })
  @IsOptional()
  @IsString()
  breed?: string;
}
