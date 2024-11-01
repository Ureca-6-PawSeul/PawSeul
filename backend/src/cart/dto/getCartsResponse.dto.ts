import { ApiProperty } from '@nestjs/swagger';
import { CartProduct } from 'src/entity/cart.product.entity';

export class GetCartsResponseDto {
  @ApiProperty({ description: '장바구니 제품 목록' })
  carts: CartProduct[];
}
