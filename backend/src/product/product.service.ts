import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/entity/food.entity';
import { Product } from 'src/entity/product.entity';
import { Snack } from 'src/entity/snack.entity';
import { Supplement } from 'src/entity/supplement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    @InjectRepository(Snack)
    private snackRepository: Repository<Snack>,
    @InjectRepository(Supplement)
    private supplementRepository: Repository<Supplement>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getProducts(
    category: string,
    subcategory: string,
    page: number,
    limit: number,
  ) {
    const options = {
      take: limit,
      skip: (page - 1) * limit,
    };

    if (category === 'food') {
      if (subcategory === 'all') {
        return this.foodRepository.find(options);
      }
      return this.foodRepository.find({
        ...options,
        where: { foodType: subcategory },
      });
    } else if (category === 'snack') {
      if (subcategory === 'all') {
        return this.snackRepository.find(options);
      }
      return this.snackRepository.find({
        ...options,
        where: { snackType: subcategory },
      });
    } else if (category === 'supplement') {
      if (subcategory === 'all') {
        return this.supplementRepository.find(options);
      }
      return this.supplementRepository.find({
        ...options,
        where: { supplementType: subcategory },
      });
    } else {
      throw new HttpException('잘못된 카테고리입니다.', HttpStatus.BAD_REQUEST);
    }
  }

  async getProductById(productId: string) {
    const product = await this.productRepository.findOne({
      where: { productId },
      relations: ['food', 'snack', 'supplement'],
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }
}
