import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateProductCartDto {
  @ApiProperty({ description: '수정할 제품의 ID' })
  @IsNotEmpty({ message: '제품 ID는 필수입니다.' })
  @IsString({ message: '제품 ID는 문자열이어야 합니다.' })
  productId: string;

  @ApiProperty({ description: '수정할 수량' })
  @IsNotEmpty({ message: '수량은 필수입니다.' })
  @IsNumber({}, { message: '수량은 숫자여야 합니다.' })
  quantity: number;
}
