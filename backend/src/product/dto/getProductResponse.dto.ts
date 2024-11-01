import { ApiProperty } from '@nestjs/swagger';
import { SnackDto } from 'src/product/dto/snack.dto';

export class GetProductResponseDto {
  @ApiProperty({
    description: '상품 리스트',
    type: () => SnackDto,
    isArray: true,
  })
  data: SnackDto[];

  @ApiProperty({ description: '상품 개수' })
  total: number;
}
