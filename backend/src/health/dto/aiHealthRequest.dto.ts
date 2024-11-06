import { IsArray, IsString, IsInt, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Allergy DTO
class AllergyDto {
  @ApiProperty({
    description: '알레르기 항목 ID',
    example: 3,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: '알레르기 항목 이름',
    example: '우유',
  })
  @IsString()
  name: string;
}

// Food DTO
class FoodDto {
  @ApiProperty({
    description: '제품 ID',
    example: 3,
  })
  @IsInt()
  product_id: number;

  @ApiProperty({
    description: '사료 제목',
    example:
      '펫스윗 전연령 로얄 그레인프리 오븐베이크드 강아지 건식사료, 2kg, 소, 1개',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '현재 칼로리',
    example: 330,
  })
  @IsNumber()
  cal: number;

  @ApiProperty({
    description: '칼슘 양 (g)',
    example: 0.9,
  })
  @IsNumber()
  calcium: number;

  @ApiProperty({
    description: '탄수화물 양 (g)',
    example: 32,
  })
  @IsNumber()
  carbon: number;

  @ApiProperty({
    description: '지방 양 (g)',
    example: 15,
  })
  @IsNumber()
  fat: number;

  @ApiProperty({
    description: '단백질 양 (g)',
    example: 22,
  })
  @IsNumber()
  protein: number;

  @ApiProperty({
    description: '비타민 A 양 (IU)',
    example: 5200,
  })
  @IsNumber()
  vitaminA: number;

  @ApiProperty({
    description: '비타민 D 양 (IU)',
    example: 450,
  })
  @IsNumber()
  vitaminD: number;

  @ApiProperty({
    description: '비타민 E 양 (mg)',
    example: 50,
  })
  @IsNumber()
  vitaminE: number;
}

// Pet DTO
class PetDto {
  @ApiProperty({
    description: '반려동물 나이',
    example: 4,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    description: '반려동물 품종',
    example: '비숑',
  })
  @IsString()
  breed: string;

  @ApiProperty({
    description: '반려동물 성별',
    example: '수컷',
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: '반려동물 체중 (kg)',
    example: 4.0,
  })
  @IsNumber()
  weight: number;
}

// Snack DTO
class SnackInfoDto {
  @ApiProperty({
    description: '간식 인덱스',
    example: 4,
  })
  @IsInt()
  index: number;

  @ApiProperty({
    description: '간식 제목',
    example: '마도로스펫 반려동물 건조 트릿 간식, 열빙어, 100g, 1개',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '현재 칼로리',
    example: 120,
  })
  @IsNumber()
  cal: number;

  @ApiProperty({
    description: '칼슘 양 (g)',
    example: 0.3,
  })
  @IsNumber()
  calcium: number;

  @ApiProperty({
    description: '탄수화물 양 (g)',
    example: 5,
  })
  @IsNumber()
  carbon: number;

  @ApiProperty({
    description: '지방 양 (g)',
    example: 4,
  })
  @IsNumber()
  fat: number;

  @ApiProperty({
    description: '단백질 양 (g)',
    example: 22,
  })
  @IsNumber()
  protein: number;

  @ApiProperty({
    description: '비타민 A 양 (IU)',
    example: 50,
  })
  @IsNumber()
  vitaminA: number;

  @ApiProperty({
    description: '비타민 D 양 (IU)',
    example: 3,
  })
  @IsNumber()
  vitaminD: number;

  @ApiProperty({
    description: '비타민 E 양 (mg)',
    example: 2,
  })
  @IsNumber()
  vitaminE: number;
}

// Main PetData DTO combining all parts
export class AiHealthRequestDto {
  @ApiProperty({
    description: '알레르기 항목 목록',
    type: [AllergyDto],
  })
  @IsArray()
  allergy: AllergyDto[];

  @ApiProperty({
    description: '사료 정보',
    type: FoodDto,
  })
  food: FoodDto;

  @ApiProperty({
    description: '반려동물 정보',
    type: PetDto,
  })
  pet: PetDto;

  @ApiProperty({
    description: '간식 정보',
    type: SnackInfoDto,
  })
  snack: SnackInfoDto;
}
