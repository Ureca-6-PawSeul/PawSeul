import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ReviewDto } from 'src/review/dto/review.dto';

export class CreateReviewResponseDto {
  @ApiProperty({
    description: '리뷰 내용',
    type: () => ReviewDto,
    isArray: true,
  })
  @IsNotEmpty()
  data: ReviewDto[];
}
