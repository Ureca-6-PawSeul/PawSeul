import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/entity/cart.entity';

export class GetCartsResponseDto {
  @ApiProperty({ description: '장바구니 목록' })
  carts: Cart[];
}
