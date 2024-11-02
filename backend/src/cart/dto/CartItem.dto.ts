import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty({ description: '장바구니 제품의 고유 ID' })
  cartProductId: string;

  @ApiProperty({ description: '제품 ID' })
  productId: string;

  @ApiProperty({ description: '제품 제목' })
  title: string;

  @ApiProperty({ description: '제품 가격' })
  price: number;

  @ApiProperty({ description: '제품 이미지 URL' })
  productImg: string;

  @ApiProperty({ description: '제품 수량' })
  quantity: number;
}

export class GetCartsResponseDto {
  @ApiProperty({ description: '장바구니 제품 목록', type: [CartItemDto] })
  carts: CartItemDto[];
}
