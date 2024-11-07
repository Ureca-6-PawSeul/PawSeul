import { ApiProperty } from '@nestjs/swagger';

export class RecommandProductDto {
  @ApiProperty({ description: '물품 고유 ID' })
  productId: string;

  @ApiProperty({ description: '물품 이름' })
  title: string;

  @ApiProperty({ description: '칼로리' })
  cal: number;

  @ApiProperty({ description: '탄수화물' })
  carbon: number;

  @ApiProperty({ description: '지방' })
  fat: number;

  @ApiProperty({ description: '단백질' })
  protein: number;

  @ApiProperty({ description: '칼슘' })
  calcium: number;

  @ApiProperty({ description: '비타민 A' })
  vitaminA: number;

  @ApiProperty({ description: '비타민 D' })
  vitaminD: number;

  @ApiProperty({ description: '비타민 E' })
  vitaminE: number;
}
