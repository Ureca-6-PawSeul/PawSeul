import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { orderListResponseDto } from 'src/order/dto/orderListResponse.dto';
import { OrderStateType } from 'src/types/order';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async confirmOrder() {}

  // async tempOrder(products: any) {}

  async getOrderList(userId: string): Promise<orderListResponseDto[]> {
    const orderProduct = await this.orderRepository.find({
      where: {
        user: { userId },
        orderState: OrderStateType.PAYMENT_COMPLETED,
      },
      relations: ['orderItems'],
    });

    return orderProduct.map((order) => {
      return {
        orderId: order.orderId,
        totalPrice: order.totalPrice,
        orderState: order.orderState,
        tossOrderKey: order.tossOrderKey,
        orderCreatedAt: order.createdAt,
        orderItems: order.orderItems.map((orderItem) => {
          return {
            productId: orderItem.product.productId,
            title: orderItem.product.title,
            price: orderItem.product.price,
            quantity: orderItem.quantity,
            productImg: orderItem.product.productImg,
          };
        }),
      };
    });
  }
}
