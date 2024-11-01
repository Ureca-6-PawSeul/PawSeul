import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from 'src/product/dto/product.dto';

export class SupplementDto extends ProductDto {
  @ApiProperty({ description: '사료 타입 (예: 건식사료, 습식사료 등)' })
  supplementType: string;
}
