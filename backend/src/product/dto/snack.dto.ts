import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from 'src/product/dto/product.dto';

export class SnackDto extends ProductDto {
  @ApiProperty({ description: '사료 타입 (예: 건식사료, 습식사료 등)' })
  snackType: string;

  @ApiProperty({ description: '대상 견종 크기' })
  targetSize: string;

  @ApiProperty({ description: '곡물 포함 여부' })
  isGrainfree: boolean;
}
