import { ApiProperty } from '@nestjs/swagger';
import { orderItemDto } from 'src/order/dto/orderItem.dto';

export class ConfirmOrderResponseDto {
  @ApiProperty({ description: '토스 결제 키' })
  tossOrderKey: string;

  @ApiProperty({ description: '주문 ID' })
  orderId: string;

  @ApiProperty({ description: '주문 상태' })
  orderItems: orderItemDto[];
}
