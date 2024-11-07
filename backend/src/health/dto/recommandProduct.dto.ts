import { ApiProperty } from '@nestjs/swagger';

export class RecommandProductDto {
  @ApiProperty({ description: '물품 고유 ID' })
  productId: string;

  @ApiProperty({ description: '물품 이름' })
  title: string;

  @ApiProperty({ description: '물품 가격' })
  price: number;

  @ApiProperty({ description: '물품 이미지 url' })
  productImg: string;

  @ApiProperty({ description: '물품 평점' })
  averageScore: number;
}
