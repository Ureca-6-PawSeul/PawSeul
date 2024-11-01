import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from 'src/entity/product.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async getProducts(
    category: 'food' | 'snack' | 'supplement',
    subcategory: string,
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

    if (subcategory !== 'all') {
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
}
