import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CategoryType,
  FoodType,
  SnackType,
  SupplementType,
} from 'src/types/category';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiQuery({
    name: 'category',
    enum: Object.values(CategoryType),
    description: '카테고리 선택 (예: Snack, Food, Supplement 등)',
    required: true,
  })
  @ApiQuery({
    name: 'subcategory',
    enum: [
      ...Object.values(SnackType),
      ...Object.values(FoodType),
      ...Object.values(SupplementType),
      '전체',
    ],
    description: '서브 카테고리 선택 (예: 특정 스낵, 음식 종류 등)',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: '페이지 번호 (기본값: 1)',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: '한 페이지에 보여줄 아이템 수 (기본값: 15)',
    required: false,
  })
  async getProduct(
    @Query('category') category: CategoryType,
    @Query('subcategory')
    subcategory: SnackType | FoodType | SupplementType | '전체',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
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
