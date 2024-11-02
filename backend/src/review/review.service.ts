import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductReview } from 'src/entity/productReview.entity';
import { CreateReviewRequestDto } from 'src/review/dto/createReviewRequest.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ProductReview)
    private productReviewRepository: Repository<ProductReview>,
  ) {}

  async getProductReviewById(productId: string) {
    const result = await this.productReviewRepository.find({
      where: { product: { productId } },
      relations: ['user'],
    });

    if (result.length === 0) {
      throw new HttpException(
        '리뷰를 찾을 수 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }
  async createProductReview(userId: string, content: CreateReviewRequestDto) {
    const review = this.productReviewRepository.create({
      user: { userId },
      product: { productId: content.productId },
      text: content.text,
      score: content.score,
    });

    await this.productReviewRepository.save(review);

    return review;
  }

  async deleteProductReview(productReviewId: string, userId: string) {
    const review = await this.productReviewRepository.findOne({
      where: { productReviewId },
    });

    if (!review) {
      throw new HttpException(
        '리뷰를 찾을 수 없습니다.',
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
}
