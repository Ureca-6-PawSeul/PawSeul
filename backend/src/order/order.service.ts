import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { OrderItem } from 'src/entity/orderItem.entity';
import { Product } from 'src/entity/product.entity';
import { ProductReview } from 'src/entity/productReview.entity';
import { orderListResponseDto } from 'src/order/dto/orderListResponse.dto';
import { OrderStateType } from 'src/types/order';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(ProductReview)
    private productReviewRepository: Repository<ProductReview>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async confirmOrder() {}

  async tempOrder(userId: string, products: any) {}

  async getOrderList(userId: string): Promise<orderListResponseDto[]> {
    if (!userId) {
      throw new HttpException(
        '사용자를 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
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

  // 리뷰하지 않은 상품 목록 조회
  async getUnreviewed(userId: string) {
    // 1단계: "결제 완료" 상태의 주문에서 제품 ID를 가져오기
    const orders = await this.orderRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.orderItems', 'oi')
      .leftJoinAndSelect('oi.product', 'product')
      .where('o.user.userId = :userId', { userId })
      .andWhere('o.orderState = :orderState', { orderState: '결제 완료' })
      .select([
        'o.orderId',
        'o.totalPrice',
        'o.createdAt',
        'o.orderState',
        'oi.orderItemId',
        'product.productId',
      ])
      .getMany();

    // 주문에서 제품 ID 추출
    const productIdsFromOrders = orders.flatMap((order) =>
      order.orderItems.map((item) => item.product.productId),
    );

    // 2단계: 유저의 리뷰 가져오기
    const reviewedProducts = await this.productReviewRepository.find({
      where: { user: { userId } },
      relations: ['product'],
      select: ['product'],
    });

    const reviewedProductIds = reviewedProducts.map(
      (review) => review.product.productId,
    );

    // 3단계: 리뷰에서 제외할 제품 ID 찾기
    const unreviewedProductIds = productIdsFromOrders.filter(
      (productId) => !reviewedProductIds.includes(productId),
    );

    // 4단계: 남은 제품의 상세 정보 가져오기
    const unreviewedProducts =
      await this.productRepository.findByIds(unreviewedProductIds);

    // 5단계: 결과를 반환
    return orders
      .map((order) => {
        // 리뷰하지 않은 제품이 포함된 경우만 반환
        const orderItems = order.orderItems
          .filter((item) =>
            unreviewedProductIds.includes(item.product.productId),
          ) // 리뷰하지 않은 제품만 필터링
          .map((item) => {
            const productDetail = unreviewedProducts.find(
              (product) => product.productId === item.product.productId,
            );
            return {
              productId: item.product.productId,
              title: productDetail.title,
              price: productDetail.price,
              quantity: item.quantity,
              productImg: productDetail.productImg,
            };
          });

        // 주문 정보가 있고, 리뷰하지 않은 제품이 있는 경우에만 반환
        if (orderItems.length > 0) {
          return {
            orderId: order.orderId,
            totalPrice: order.totalPrice,
            orderCreatedAt: order.createdAt,
            orderState: order.orderState,
            orderItems,
          };
        }
        return null;
      })
      .filter((order) => order !== null);
  }
}
