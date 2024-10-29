import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/product')
  async getProduct(
    @Query('category') category: string,
    @Query('subcategory') subcategory: string,
    @Query('page') page = 1,
    @Query('limit') limit = 15,
  ) {
    try {
      const product = await this.productService.getProducts(
        category,
        subcategory,
        page,
        limit,
      );
      if (!product) {
        throw new HttpException(
          '상품이 존재하지 않아요!',
          HttpStatus.NOT_FOUND,
        );
      }
      return { product, total: product.length };
    } catch (error) {
      throw new HttpException(
        error.message || '상품을 불러오는데 실패했어요!',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/product/:id')
  async getProductById(@Query('id') id: string) {
    try {
      const product = await this.productService.getProductById(id);
      if (!product) {
        throw new HttpException(
          '상품이 존재하지 않아요!',
          HttpStatus.NOT_FOUND,
        );
      }
      return product;
    } catch (error) {
      throw new HttpException(
        error.message || '상품을 불러오는데 실패했어요!',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
