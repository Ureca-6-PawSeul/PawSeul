import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { OrderItem } from 'src/entity/orderItem.entity';
import { ProductReview } from 'src/entity/productReview.entity';
import { User } from 'src/entity/user.entity';
import { CreateReviewRequestDto } from 'src/review/dto/createReviewRequest.dto';
import { ReviewDto } from 'src/review/dto/review.dto';
import { Repository } from 'typeorm';
import { Product } from 'src/entity/product.entity';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger(ReviewService.name);
  constructor(
    @InjectRepository(ProductReview)
    private productReviewRepository: Repository<ProductReview>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProductReviewById(productId: string): Promise<ReviewDto[]> {
    const result = await this.productReviewRepository.find({
      where: { product: { productId } },
      relations: ['user', 'user.pet'],
    });

    if (result.length === 0) {
      throw new HttpException(
        '리뷰를 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const reviews = result.map((review) => ({
      productReviewId: review.productReviewId,
      productId: review.product.productId,
      userId: review.user.userId,
      text: review.text,
      score: review.score,
      pet: {
        petname: review.user.pet?.petname || '',
        age: review.user.pet?.age || 0,
        weight: review.user.pet?.weight || 0,
      },
      createdAt: review.createdAt,
    }));

    return reviews;
  }

  async createProductReview(userId: string, content: CreateReviewRequestDto) {
    const review = this.productReviewRepository.create({
      user: { userId },
      product: { productId: content.productId },
      text: content.text,
      score: content.score,
    });

    await this.productReviewRepository.save(review);
    await this.updateAverageScore(content.productId);

    return review;
  }

  private async updateAverageScore(productId: string) {
    const reviews = await this.productReviewRepository.find({
      where: { product: { productId } },
    });

    // 리뷰가 없을 경우 평균 점수를 0으로 설정
    if (reviews.length === 0) {
      await this.productRepository.update(productId, { averageScore: 0 });
      return;
    }
    // 평균 점수 계산
    const totalScore = reviews.reduce((acc, review) => acc + review.score, 0);
    const averageScore = totalScore / reviews.length;

    await this.productRepository.update(productId, { averageScore });
  }

  async deleteProductReview(productReviewId: string, userId: string) {
    const review = await this.productReviewRepository.findOne({
      where: { productReviewId },
    });

    if (!review) {
      throw new HttpException(
        '리뷰를 찾을 수 없습니다www.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (review.user.userId !== userId) {
      throw new HttpException(
        '리뷰를 삭제할 권한이 없습니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const result = await this.productReviewRepository.delete(productReviewId);

    if (result.affected === 0) {
      throw new HttpException(
        '리뷰를 삭제를 실패했습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async getMyReviews(userId: string) {
    const user = await this.userRepository.findOneBy({ userId });

    if (!user) {
      throw new HttpException(
        '사용자를 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const orders = await this.orderRepository.find({
      where: { user },
      relations: ['product'],
    });

    if (orders.length === 0) {
      throw new HttpException('주문 내역이 없습니다.', HttpStatus.BAD_REQUEST);
    }

    return orders;

    // const result = await this.productReviewRepository.find({
    //   where: { user },
    //   relations: ['product'],
    // });

    // if (result.length === 0) {
    //   throw new HttpException(
    //     '리뷰를 찾을 수 없습니다.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // const formattedReviews = result.map((review) => ({
    //   productId: review.product.productId,
    //   title: review.product.title,
    //   price: review.product.price,
    //   productImg: review.product.productImg,
    //   quantity: review.product.quantity,
    // }));

    // return formattedReviews;
  }

  async getReviewed(userId: string) {
    // 1단계: 유저가 작성한 리뷰에서 제품 ID 가져오기
    const reviewedProducts = await this.productReviewRepository.find({
      where: { user: { userId } },
      relations: ['product'],
      select: ['product'],
    });

    const reviewedProductIds = reviewedProducts.map(
      (review) => review.product.productId,
    );

    // 2단계: "결제 완료" 상태의 주문에서 리뷰가 있는 제품을 가져오기
    const orders = await this.orderRepository
      .createQueryBuilder('o')
      .leftJoinAndSelect('o.orderItems', 'oi')
      .leftJoinAndSelect('oi.product', 'product')
      .where('o.user.userId = :userId', { userId })
      .andWhere('o.orderState = :orderState', { orderState: '결제 완료' })
      .andWhere('product.productId IN (:...reviewedProductIds)', {
        reviewedProductIds,
      })
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

    // 3단계: 제품 상세 정보 가져오기
    const reviewedProductsDetails =
      await this.productRepository.findByIds(reviewedProductIds);

    // 4단계: 결과를 반환
    return {
      reviews: orders.flatMap((order) => {
        const orderItems = order.orderItems
          .filter((item) => reviewedProductIds.includes(item.product.productId))
          .map((item) => {
            const productDetail = reviewedProductsDetails.find(
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

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { productId },
    });

    if (!product) {
      throw new HttpException('제품을 찾을 수 없습니다.', HttpStatus.NOT_FOUND);
    }

    return product;
  }
}
