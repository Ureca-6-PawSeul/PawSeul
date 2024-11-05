import { ApiProperty } from '@nestjs/swagger';
import { PartialOrderItemDto } from 'src/order/dto/PartialOrderItem.dto';

export class TempOrderRequestDto {
  @ApiProperty({ description: '주문 수량' })
  totalPrice: number;

  @ApiProperty({ description: '주문 물품' })
  orderItems: PartialOrderItemDto[];
}
