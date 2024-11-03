import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateReviewResponseDto } from 'src/review/dto/createReviewResponse.dto';
import { CreateReviewRequestDto } from 'src/review/dto/createReviewRequest.dto';

@Controller('/review')
@ApiTags('상품 리뷰 api')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '상품 리뷰 조회' })
  @ApiCreatedResponse({
    description: '상품 리뷰 조회 성공',
    type: CreateReviewResponseDto,
  })
  @Get('/:productId')
  async getProductReviewById(@Param('productId') productId: string) {
    return this.reviewService.getProductReviewById(productId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @Post('/:productId')
  @ApiBody({
    type: CreateReviewRequestDto,
  })
  async createProductReview(
    @Req() req: Request,
    @Body('productId') productId: string,
    @Body('text') text: string,
    @Body('score') score: number,
  ) {
    const userId = req.user?.userId;
    const review: CreateReviewRequestDto = {
      userId,
      productId,
      text,
      score,
    };

    return this.reviewService.createProductReview(userId, review);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @ApiOperation({ summary: '상품 리뷰 삭제' })
  @ApiCookieAuth('accessToken')
  @Delete('/:productReviewId')
  async deleteProductReview(
    @Req() req: Request,
    @Param('productReviewId') productReviewId: string,
  ) {
    const userId = req.user?.userId;
    return this.reviewService.deleteProductReview(productReviewId, userId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: '자신의 리뷰' })
  @Get('/me')
  async getMyReview(@Req() req: Request) {
    const userId = req.user?.userId;
    return this.reviewService.getMyReview(userId);
  }
}
