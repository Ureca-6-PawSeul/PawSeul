import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ description: '상품 ID' })
  productId: string;

  @ApiProperty({ description: '상품 이름' })
  title: string;

  @ApiProperty({ description: '상품 카테고리' })
  category: string;

  @ApiProperty({ description: '상품 설명' })
  description: string;

  @ApiProperty({ description: '상품 가격' })
  price: number;

  @ApiProperty({ description: '상품 이미지 URL' })
  productImg: string;

  @ApiProperty({ description: '상품 설명 이미지 URL' })
  descriptionImg: string[];

  @ApiProperty({ description: '주요 재료' })
  mainIngredient: string;

  @ApiProperty({ description: '상품 기능' })
  productFunction: string;

  @ApiProperty({ description: '상품 타겟' })
  targetAge: string;

  @ApiHideProperty()
  createdAt: Date;
}
