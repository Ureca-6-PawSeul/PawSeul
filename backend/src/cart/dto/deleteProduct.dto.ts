import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProductDto {
  @ApiProperty({ description: '삭제할 제품의 ID' })
  @IsNotEmpty({ message: '제품 ID는 필수입니다.' })
  @IsString({ message: '제품 ID는 문자열이어야 합니다.' })
  productId: string;
}
