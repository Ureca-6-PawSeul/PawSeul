import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { PetInfoDto } from 'src/pet/dto/petInfo.dto';

export class ReviewDto {
  @ApiProperty({ description: '리뷰 ID' })
  @IsNotEmpty()
  productReviewId: string;

  @ApiProperty({ description: '리뷰 product ID' })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: '유저 ID' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: '리뷰 점수' })
  @IsNotEmpty()
  score: number;

  @ApiProperty({ description: '리뷰 내용' })
  pet?: PetInfoDto;

  @ApiProperty({ description: '리뷰 작성 날짜' })
  createdAt: Date;
}
