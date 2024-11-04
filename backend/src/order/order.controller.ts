import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { orderListResponseDto } from 'src/order/dto/orderListResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ProductDto } from 'src/product/dto/product.dto';
import { MyReviewsRequestDto } from './dto/myReviewsRequest.dto';

@Controller('order')
@ApiTags('order/결제 api')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/list')
  @ApiCookieAuth('accessToken')
  @UseGuards(AuthGuard('jwt-access'))
  @ApiOperation({ summary: '주문 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '주문 목록 조회 성공',
    type: orderListResponseDto,
    isArray: true,
  })
  async getOrderList(@Req() req: Request): Promise<orderListResponseDto[]> {
    const { userId } = req.user;
    if (!userId) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }
    return this.orderService.getOrderList(userId);
  }

  @Get('/review')
  @ApiCookieAuth('accessToken')
  @Post('/confirm')
  @ApiOperation({ summary: '결제 승인 요청' })
  async confirmOrder(
    @Req() req: Request,
    @Body('paymentKey') paymentKey: string,
    @Body('orderId') orderId: string,
    @Body('amount') amount: string,
  ) {
    const { userId } = req.user;
    if (!userId) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }
    return this.orderService.confirmOrder();
  }

  @Post('/temp-order')
  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({
    summary: '임시 주문(order table에 결제 전 상태로 insert)',
  })
  async tempOrder(@Body('products') products: any) {}

  // 리뷰하지 않은 상품 목록 조회
  @Get('/unreviewed')
  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({
    summary: '리뷰해야 할 상품 목록 조회',
  })
  @ApiResponse({
    status: 200,
    description: '리뷰하지 않은 제품 목록',
    type: [MyReviewsRequestDto],
  })
  async getUnreviewedProducts(@Req() req: Request) {
    const userId = req.user.userId;
    return this.orderService.getUnreviewed(userId);
  }
}
