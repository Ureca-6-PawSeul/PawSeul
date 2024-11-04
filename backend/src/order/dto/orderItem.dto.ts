import { ApiProperty } from '@nestjs/swagger';

export class orderItemDto {
  @ApiProperty({ description: '물품 고유 ID' })
  productId: string;

  @ApiProperty({ description: '물품 수량' })
  quantity: number;

  @ApiProperty({ description: '물품 가격' })
  price: number;

  @ApiProperty({ description: '물품 이름' })
  title: string;

  @ApiProperty({ description: '물품 이미지' })
  productImg: string;
}
