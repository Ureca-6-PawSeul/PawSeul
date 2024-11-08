import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RecommendProductDto } from 'src/health/dto/recommendProduct.dto';

export enum BodyShape {
  Thin = '마름',
  Normal = '보통',
  Chubby = '통통',
}

export class NutrientAmountDto {
  @ApiProperty({ description: '영양소의 현재 양 (g)' })
  @IsNumber()
  currentAmount: number;

  @ApiProperty({ description: '영양소의 적정 양 (g)' })
  @IsNumber()
  optimalAmount: number;
}

export class AiHealthResponseDto {
  @ApiProperty({ description: '체형 정보', enum: BodyShape })
  @IsEnum(BodyShape)
  bodyShape: BodyShape;

  @ApiProperty({ description: '현재 칼로리 섭취량' })
  @IsNumber()
  currentCalories: number;

  @ApiProperty({ description: '적정 칼로리 섭취량' })
  @IsNumber()
  optimalCalories: number;

  @ApiProperty({ description: '탄수화물 양 정보', type: NutrientAmountDto })
  carbon: NutrientAmountDto;

  @ApiProperty({ description: '단백질 양 정보', type: NutrientAmountDto })
  protein: NutrientAmountDto;

  @ApiProperty({ description: '지방 양 정보', type: NutrientAmountDto })
  fat: NutrientAmountDto;

  @ApiProperty({ description: '부족한 영양소 목록', type: [String] })
  insufficientNutrients: string[];

  @ApiProperty({ description: '과잉된 영양소 목록', type: [String] })
  excessNutrients: string[];

  @ApiProperty({ description: '적정 영양소 목록', type: [String] })
  optimalNutrients: string[];

  @ApiProperty({
    description: '추천 제품 목록',
    type: RecommendProductDto,
    isArray: true,
  })
  recommendedProducts: RecommendProductDto[];
}
