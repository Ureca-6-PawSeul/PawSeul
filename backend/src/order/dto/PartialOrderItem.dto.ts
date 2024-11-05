import { OmitType } from '@nestjs/swagger';
import { orderItemDto } from 'src/order/dto/orderItem.dto';

export class PartialOrderItemDto extends OmitType(orderItemDto, [
  'title',
  'productImg',
]) {}
