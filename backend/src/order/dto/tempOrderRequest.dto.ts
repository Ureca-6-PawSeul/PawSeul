import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { PartialOrderItemDto } from 'src/order/dto/PartialOrderItem.dto';

export class TempOrderRequestDto {
  @ApiProperty({ description: '주문 수량' })
  @IsNotEmpty({ message: '총 가격은 필수입니다.' })
  @IsNumber({}, { message: '총 가격은 숫자여야 합니다.' })
  totalPrice: number;

  @ApiProperty({
    description: '주문 물품',
    type: () => PartialOrderItemDto,
    isArray: true,
  })
  @IsNotEmpty({ message: '주문 항목은 필수입니다.' })
  @IsArray({ message: '주문 항목은 배열이어야 합니다.' })
  orderItems: PartialOrderItemDto[];
}
