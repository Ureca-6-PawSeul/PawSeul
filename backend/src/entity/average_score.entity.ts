import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entity/product.entity';
import { ProductReview } from 'src/entity/productReview.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductReview)
    private readonly productReviewRepository: Repository<ProductReview>,
  ) {}

  async getTop10Products(): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productReviews', 'review')
      .select('product.*')
      .addSelect('AVG(review.score)', 'average_score')
      .groupBy('product.product_id')
      .orderBy('average_score', 'DESC')
      .limit(10)
      .getRawMany();
  }
}
