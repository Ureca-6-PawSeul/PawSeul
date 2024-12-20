import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { GetCartsResponseDto } from 'src/cart/dto/getCartsResponse.dto';
import { AddProductCartDto } from 'src/cart/dto/addProductCart.dto';
import { UpdateProductCartDto } from 'src/cart/dto/updateProductCart.dto';
import { DeleteProductDto } from 'src/cart/dto/deleteProduct.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

@Controller('cart')
@ApiTags('장바구니 API')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  private getUserId(req: Request): string {
    return req.user?.userId;
  }

  // 장바구니 조회
  @UseGuards(AuthGuard('jwt-access'))
  @Get()
  @ApiOperation({ summary: '장바구니 상품 조회' })
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    description: '장바구니 정보 조회 성공',
    type: GetCartsResponseDto,
  })
  async getCarts(@Req() req: Request): Promise<GetCartsResponseDto> {
    const userId = this.getUserId(req);
    return this.cartService.getCartsUserId(userId);
  }

  // 장바구니 상품 추가
  @UseGuards(AuthGuard('jwt-access'))
  @Post('add')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: '장바구니 상품 추가' })
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    description: '장바구니에 상품 추가 성공',
    type: AddProductCartDto,
  })
  async addProduct(
    @Req() req: Request,
    @Body() addProductDto: AddProductCartDto,
  ) {
    const userId = this.getUserId(req);
    return this.cartService.addProductCart(userId, addProductDto);
  }

  // 장바구니 상품 수정
  @UseGuards(AuthGuard('jwt-access'))
  @Patch('update')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: '장바구니 상품 수정' })
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    description: '장바구니에 상품 수정 성공',
    type: UpdateProductCartDto,
  })
  async updateProduct(
    @Req() req: Request,
    @Body() updateProductDto: UpdateProductCartDto,
  ) {
    const userId = this.getUserId(req);
    return this.cartService.updateProductCart(userId, updateProductDto);
  }

  // 장바구니 상품 삭제
  @UseGuards(AuthGuard('jwt-access'))
  @Delete('remove')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: '장바구니 상품 삭제' })
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    description: '장바구니 상품 삭제 성공',
    type: GetCartsResponseDto,
  })
  async deleteProduct(
    @Req() req: Request,
    @Body() deleteProductDto: DeleteProductDto,
  ) {
    const userId = this.getUserId(req);
    if (deleteProductDto.productIds.length === 0) {
      throw new HttpException(
        '삭제할 상품이 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!userId) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }

    return this.cartService.deleteProductsCart(
      userId,
      deleteProductDto.productIds,
    );
  }
}
