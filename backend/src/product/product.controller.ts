import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Category } from 'src/types/category';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getProduct(
    @Query('category') category: Category,
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

  @Get(':id/detail')
  async getProductById(@Param('id') id: string) {
    try {
      const product = await this.productService.getProductById(id);

      if (!product) {
        throw new HttpException(
          '상품이 존재하지 않아요!',
          HttpStatus.NOT_FOUND,
        );
      }

      // Handle empty arrays for food, snack, supplement
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
    } catch (error) {
      throw new HttpException(
        error.message || '상품을 불러오는데 실패했어요!',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/search')
  async searchProducts(@Query('query') title: string) {
    try {
      const products = await this.productService.searchProducts(title);
      return products;
    } catch (error) {
      throw new HttpException(
        error.message || '상품을 검색하는데 실패했어요!',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
