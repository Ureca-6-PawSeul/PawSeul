import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { GetCartsResponseDto } from './dto/getCartsResponse.dto';
import { AddProductToCartDto } from './dto/addProductToCart.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('cart')
@ApiTags('장바구니 API')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @Get()
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    status: 200,
    description: '장바구니 정보 조회 성공',
    type: GetCartsResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCarts(@Req() req: Request): Promise<GetCartsResponseDto> {
    const userId = req.user?.userId;
    return this.cartService.getCartsByUserId(userId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @Post('add')
  @ApiBearerAuth('accessToken')
  @ApiResponse({
    status: 201,
    description: '장바구니에 제품 추가 성공',
    type: AddProductToCartDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async addProduct(
    @Req() req: Request,
    @Body() addProductDto: AddProductToCartDto,
  ) {
    const userId = req.user?.userId;
    return this.cartService.addProductToCart(userId, addProductDto);
  }
}
