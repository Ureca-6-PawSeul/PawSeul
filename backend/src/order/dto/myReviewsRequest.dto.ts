import { ApiProperty } from '@nestjs/swagger';

export class MyReviewsRequestDto {
  @ApiProperty({ description: '주문 상품 ID' })
  productId: string;

  @ApiProperty({ description: '주문 수량' })
  quantity: number;

  @ApiProperty({ description: '주문 가격' })
  price: number;

  @ApiProperty({ description: '주문 상품 이름' })
  title: string;

  @ApiProperty({ description: '주문 상품 이미지 URL' })
  productImg: string;
}
