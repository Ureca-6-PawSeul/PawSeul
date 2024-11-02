import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { GetCartsResponseDto } from 'src/cart/dto/getCartsResponse.dto';
import { AddProductCartDto } from 'src/cart/dto/addProductCart.dto';
import { UpdateProductCartDto } from 'src/cart/dto/updateProductCart.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @Post('update')
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
}
