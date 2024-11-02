import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductCartDto {
  @ApiProperty({ description: '수정할 제품의 ID' })
  productId: string;

  @ApiProperty({ description: '수정할 수량' })
  quantity: number;
}
