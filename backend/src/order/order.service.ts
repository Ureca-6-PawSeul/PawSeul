import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProduct } from 'src/entity/cart.product.entity';
import { Order } from 'src/entity/order.entity';
import { OrderItem } from 'src/entity/orderItem.entity';
import { Product } from 'src/entity/product.entity';
import { ProductReview } from 'src/entity/productReview.entity';
import { User } from 'src/entity/user.entity';
import { orderListResponseDto } from 'src/order/dto/orderListResponse.dto';
import { TempOrderRequestDto } from 'src/order/dto/tempOrderRequest.dto';
import { OrderStateType } from 'src/types/order';
import { In, Repository } from 'typeorm';

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

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,
  ) {}

  async tempOrder(
    tempOrderRequestDto: TempOrderRequestDto,
    userId: string,
  ): Promise<string> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new HttpException(
        '사용자를 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const orderItems = await Promise.all(
      tempOrderRequestDto.orderItems.map(async (orderItem) => {
        const product = await this.productRepository.findOneBy({
          productId: orderItem.productId,
        });
        console.log('ewfwefewfw', product);
        if (!product) {
          console.log('wevawvdvvwe');
          throw new HttpException(
            `상품이 존재하지 않습니다: ${orderItem.productId}`,
            HttpStatus.BAD_REQUEST,
          );
        }
        return this.orderItemRepository.create({
          product,
          quantity: orderItem.quantity,
          price: orderItem.price,
        });
      }),
    );

    const order = this.orderRepository.create({
      user,
      orderState: OrderStateType.BEFORE_PAYMENT,
      totalPrice: tempOrderRequestDto.totalPrice,
      orderItems,
    });

    await this.orderRepository.save(order);

    tempOrderRequestDto.orderItems.forEach((orderItem) => {
      this.orderItemRepository.save({
        order: order,
        product: { productId: orderItem.productId },
        quantity: orderItem.quantity,
        price: orderItem.price,
      });
    });

    return order.orderId;
  }
  async confirmOrder(tossOrderKey: string, orderId: string, price: number) {
    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new HttpException(
        '주문을 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (order.totalPrice !== price) {
      throw new HttpException(
        '결제 금액이 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.confirmPayment(tossOrderKey, orderId, price);
    order.tossOrderKey = tossOrderKey;
    order.orderState = OrderStateType.PAYMENT_COMPLETED;

    await this.orderRepository.save(order);
    return result;
  }

  async deleteProductAfterOrder(userId: string, orderId: string) {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new HttpException(
        '사용자를 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['orderItems'],
    });

    if (!order) {
      throw new HttpException(
        '주문을 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    for (const orderItem of order.orderItems) {
      const product = orderItem.product;
      const cartProduct = await this.cartProductRepository.findOne({
        where: { user: { userId }, product: { productId: product.productId } },
      });
      console.log('cartProduct', cartProduct);

      if (!cartProduct) {
        throw new HttpException(
          '장바구니에 해당 상품이 없습니다.',
          HttpStatus.BAD_REQUEST,
        );
      }

      cartProduct.quantity -= orderItem.quantity;
      if (cartProduct.quantity <= 0) {
        await this.cartProductRepository.remove(cartProduct);
      } else {
        await this.cartProductRepository.save(cartProduct);
      }
    }
  }

  private async confirmPayment(
    tossOrderKey: string,
    orderId: string,
    price: number,
  ) {
    const response = await fetch(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
        },
        body: JSON.stringify({
          orderId,
          amount: price,
          paymentKey: tossOrderKey,
        }),
      },
    );

    if (!response.ok) {
      throw new HttpException(
        '결제 승인에 실패했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await response.json();
  }

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
        orderState: In([
          OrderStateType.PAYMENT_COMPLETED,
          OrderStateType.CANCELED,
        ]),
      },
      relations: ['orderItems', 'orderItems.product'],
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
        'oi.quantity',
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
    return {
      reviews: orders.flatMap((order) => {
        // 리뷰하지 않은 제품이 포함된 경우만 반환
        const orderItems = order.orderItems
          .filter((item) =>
            unreviewedProductIds.includes(item.product.productId),
          )
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
              state: order.orderState,
            };
          });

        // orderItems가 비어 있지 않은 경우에만 해당 아이템을 반환
        return orderItems.length > 0 ? orderItems : [];
      }),
    };
  }

  async failOrder(orderId: string, userId: string) {
    const user = await this.userRepository.findOneBy({ userId });
    const order = await this.orderRepository.findOne({
      where: { orderId, user },
      relations: ['orderItems'],
    });
    if (!order) {
      throw new HttpException(
        '주문을 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (order.orderState === OrderStateType.PAYMENT_COMPLETED) {
      throw new HttpException(
        '이미 결제된 주문입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    order.orderState = OrderStateType.PAYMENT_FAIL;
    await this.orderRepository.save(order);
  }

  async cancelOrder(orderId: string, userId: string) {
    const user = await this.userRepository.findOneBy({ userId });
    const order = await this.orderRepository.findOne({
      where: { orderId, user },
      relations: ['orderItems'],
    });
    if (!order) {
      throw new HttpException(
        '주문을 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (order.orderState === OrderStateType.PAYMENT_COMPLETED) {
      order.orderState = OrderStateType.CANCELED;
    }
    await this.orderRepository.save(order);
  }
}
