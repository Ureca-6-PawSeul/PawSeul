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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProductResponseDto } from 'src/product/dto/getProductResponse.dto';
import { SnackDto } from 'src/product/dto/snack.dto';

@Controller('product')
@ApiTags('상품 api')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @ApiOperation({ summary: '카테고리 별 상품들 조회' })
  @ApiResponse({
    status: 200,
    description: 'snack 상품 조회 성공',
    type: GetProductResponseDto,
  })
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
      return { data: product, total: product.length };
    } catch (error) {
      throw new HttpException(
        error.message || '상품을 불러오는데 실패했어요!',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/detail')
  @ApiOperation({ summary: '상품 상세 조회' })
  @ApiResponse({
    status: 200,
    description: '상품 상세 조회 성공',
    type: SnackDto,
  })
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
      return product;
    } catch (error) {
      throw new HttpException(
        error.message || '상품을 불러오는데 실패했어요!',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/search')
  @ApiOperation({ summary: '상품 조회' })
  @ApiResponse({
    status: 200,
    description: '상품 상세 조회 성공',
    type: () => SnackDto,
    isArray: true,
  })
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
