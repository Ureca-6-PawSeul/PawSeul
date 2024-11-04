import { ApiProperty } from '@nestjs/swagger';
import { orderItemDto } from 'src/order/dto/orderItem.dto';
import { OrderStateType } from 'src/types/order';

export class orderListResponseDto {
  @ApiProperty({ description: '주문의 고유 ID' })
  orderId: string;

  @ApiProperty({ description: '사용자 ID' })
  totalPrice: number;

  @ApiProperty({ description: '주문 상태' })
  orderState: OrderStateType;

  @ApiProperty({ description: 'Toss 주문 키' })
  tossOrderKey: string;

  @ApiProperty({
    description: '주문 상품 리스트',
    type: () => orderItemDto,
    isArray: true,
  })
  orderItems: orderItemDto[];
}
