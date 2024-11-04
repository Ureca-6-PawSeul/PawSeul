import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from 'src/entity/product.entity';
import { ProductReview } from 'src/entity/productReview.entity';
import { FoodType, SnackType, SupplementType } from 'src/types/category';

import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: Repository<ProductReview>, // 추가
  ) {}
  async getProducts(
    category: 'food' | 'snack' | 'supplement',
    subcategory: SnackType | FoodType | SupplementType | '전체',
    page: number,
    limit: number,
  ) {
    const options = {
      take: limit,
      skip: (page - 1) * limit,
    };

    const query = this.productRepository
      .createQueryBuilder('product')
      .where('product.category = :category', { category });

    if (subcategory !== '전체') {
      if (category === 'snack') {
        query
          .innerJoinAndSelect('product.snack', 'snack') // Snack 테이블과 조인
          .andWhere('snack.snack_type = :subcategory', { subcategory });
      } else if (category === 'food') {
        query
          .innerJoinAndSelect('product.food', 'food') // Food 테이블과 조인
          .andWhere('food.food_type = :subcategory', { subcategory });
      } else if (category === 'supplement') {
        query
          .innerJoinAndSelect('product.supplement', 'supplement') // Supplement 테이블과 조인
          .andWhere('supplement.supplement_type = :subcategory', {
            subcategory,
          });
      }
    }

    const products = await query
      .skip(options.skip)
      .take(options.take)
      .getMany();

    return products;
  }

  async getProductById(productId: string) {
    const product = await this.productRepository.findOne({
      where: { productId },
      relations: ['food', 'snack', 'supplement'],
    });

    if (!product) {
      throw new Error('Product not found');
    }

    const { food, snack, supplement, ...rest } = product;
    const foodInfo = food.length > 0 ? food[0] : null;
    const snackInfo = snack.length > 0 ? snack[0] : null;
    const supplementInfo = supplement.length > 0 ? supplement[0] : null;

    return {
      ...rest,
      ...(foodInfo && {
        targetSize: foodInfo.targetSize,
        isGrainfree: foodInfo.isGrainfree,
        foodType: foodInfo.foodType,
      }),
      ...(snackInfo && {
        snackType: snackInfo.snackType,
        targetSize: snackInfo.targetSize,
        isGrainfree: snackInfo.isGrainfree,
      }),
      ...(supplementInfo && {
        supplementType: supplementInfo.supplementType,
      }),
    };
  }

  async searchProducts(keyword: string): Promise<Product[]> {
    const keywordStart = `${keyword}%`; // 시작 부분
    const keywordMiddle = `%${keyword}%`; // 중간 부분

    const products = await this.productRepository
      .createQueryBuilder('product')
      .where('product.title LIKE :keywordStart', { keywordStart })
      .orWhere('product.title LIKE :keywordMiddle', { keywordMiddle })
      .limit(5) // 최대 5개 결과
      .getMany();

    return products;
  }

  async getProductsWithMyReview(userId: string, page: number, limit: number) {
    const options = {
      take: limit,
      skip: (page - 1) * limit,
    };

    const products = await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.reviews', 'review')
      .where('review.user.userId = :userId', { userId })
      .skip(options.skip)
      .take(options.take)
      .getMany();

    return products;
  }

  // 평균 점수를 기준으로 상위 10개 상품 조회
  async getTop10Products(): Promise<
    { product_id: string; title: string; price: number; product_img: string }[]
  > {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.productReviews', 'review')
      .select([
        'product.productId AS product_id',
        'product.title AS title',
        'product.price AS price',
        'product.productImg AS product_img',
        'AVG(review.score) AS average_score',
      ])
      .groupBy('product.productId')
      .orderBy('average_score', 'DESC')
      .limit(10)
      .getRawMany();
  }
}
