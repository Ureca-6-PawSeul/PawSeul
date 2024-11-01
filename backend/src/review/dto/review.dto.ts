import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReviewDto {
  @ApiProperty({ description: '리뷰 product ID' })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: '리뷰 내용' })
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: '리뷰 점수 (1~5)' })
  @IsNotEmpty()
  score: number;

  @ApiProperty({ description: '리뷰 작성자 ID' })
  @IsNotEmpty()
  userId: string;

  @ApiHideProperty()
  @IsNotEmpty()
  createdAt?: Date;
}
