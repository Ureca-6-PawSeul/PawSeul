import { ApiProperty } from '@nestjs/swagger';

export class DeleteProductDto {
  @ApiProperty({ description: '삭제할 제품의 ID' })
  productId: string;
}
