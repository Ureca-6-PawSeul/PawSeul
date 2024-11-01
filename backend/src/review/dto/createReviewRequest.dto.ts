import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReviewRequestDto {
  @ApiProperty({ description: '리뷰 product ID' })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: '리뷰 내용' })
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: '리뷰 점수 (1~5)' })
  @IsNotEmpty()
  score: number;

  @ApiHideProperty()
  @IsNotEmpty()
  userId: string;
}
