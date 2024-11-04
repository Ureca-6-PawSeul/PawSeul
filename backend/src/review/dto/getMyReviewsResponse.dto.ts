import { ApiProperty } from '@nestjs/swagger';
import { MyReviewsRequestDto } from 'src/order/dto/myReviewsRequest.dto';

export class getMyReviewsResponseDto {
  @ApiProperty({
    description: '상품 ID',
    type: () => MyReviewsRequestDto,
    isArray: true,
  })
  reviews: MyReviewsRequestDto[];
}
