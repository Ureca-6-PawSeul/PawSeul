import { ApiProperty } from '@nestjs/swagger';
import { CartItemDto } from './CartItem.dto';

export class GetCartsResponseDto {
  @ApiProperty({ description: '장바구니 제품 목록', type: () => [CartItemDto] })
  carts: CartItemDto[];
}
