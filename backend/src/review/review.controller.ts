import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
import { CreateReviewRequestDto } from 'src/review/dto/createReviewRequest.dto';
import { getMyReviewsResponseDto } from 'src/review/dto/getMyReviewsResponse.dto';
import { ReviewDto } from 'src/review/dto/review.dto';

@Controller('/review')
@ApiTags('상품 리뷰 api')
export class ReviewController {
  private readonly logger = new Logger(ReviewController.name);
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: '자신의 리뷰' })
  @ApiCreatedResponse({
    description: '자신의 리뷰 조회 성공',
    type: getMyReviewsResponseDto,
  })
  @Get('/me')
  async getMyReview(@Req() req: Request): Promise<getMyReviewsResponseDto> {
    const userId = req.user?.userId;
    this.logger.log('userId');
    this.logger.log('userId', userId);
    if (!userId) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }
    const reviews = await this.reviewService.getReviewed(userId);

    return reviews;
  }

  @ApiOperation({ summary: '상품 리뷰 조회' })
  @ApiCreatedResponse({
    description: '상품 리뷰 조회 성공',
    type: ReviewDto,
    isArray: true,
  })
  @Get('/:productId')
  async getProductReviewById(@Param('productId') productId: string) {
    return this.reviewService.getProductReviewById(productId);
  }

  @UseGuards(AuthGuard('jwt-access'))
  @ApiCookieAuth('accessToken')
  @ApiOperation({ summary: '상품 리뷰 생성' })
  @Post('/:productId')
  @UsePipes(new ValidationPipe())
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
    if (!userId) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }
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
    this.logger.log('userId', userId);
    if (!userId) {
      throw new HttpException('로그인이 필요합니다.', HttpStatus.UNAUTHORIZED);
    }
    return this.reviewService.deleteProductReview(productReviewId, userId);
  }
}
