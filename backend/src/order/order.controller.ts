import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { orderListResponseDto } from 'src/order/dto/orderListResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { MyReviewsRequestDto } from './dto/myReviewsRequest.dto';
import { TempOrderRequestDto } from 'src/order/dto/tempOrderRequest.dto';
import { ConfirmOrderResponseDto } from 'src/order/dto/confirmOrderResponse.dto';

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

  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @Patch('/confirm')
  @ApiOperation({ summary: '결제 승인 요청' })
  @ApiBody({
    type: ConfirmOrderResponseDto,
  })
  async confirmOrder(
    @Req() req: Request,
    @Body('tossOrderKey') tossOrderKey: string,
    @Body('orderId') orderId: string,
    @Body('price') price: number,
  ) {
    const { userId } = req.user;
    if (!userId) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }

    await this.orderService.confirmOrder(tossOrderKey, orderId, price);

    await this.orderService.deleteProductAfterOrder(userId, orderId);

    return HttpStatus.OK;
  }

  @Post('/temp-order')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({
    summary: '임시 주문(order table에 결제 전 상태로 insert)',
  })
  @ApiBody({
    type: TempOrderRequestDto,
  })
  async tempOrder(
    @Req() req: Request,
    @Body() tempOrderRequestDto: TempOrderRequestDto,
  ) {
    const { userId } = req.user;
    if (!userId) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }
    return this.orderService.tempOrder(tempOrderRequestDto, userId);
  }

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

  @Delete('/:orderId')
  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({
    summary: '주문 실패',
  })
  async failOrder(@Req() req: Request, @Param('orderId') orderId: string) {
    const userId = req.user.userId;
    if (!userId) {
      throw new HttpException(
        '로그인이 만료되었습니다. 다시 로그인해주세요.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.orderService.failOrder(orderId, userId);
  }

  @Patch('/:orderId')
  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({
    summary: '결제 취소',
  })
  async cancelOrder(@Req() req: Request, @Param('orderId') orderId: string) {
    const userId = req.user.userId;
    if (!userId) {
      throw new HttpException(
        '로그인이 만료되었습니다. 다시 로그인해주세요.',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.orderService.cancelOrder(orderId, userId);
  }
}
