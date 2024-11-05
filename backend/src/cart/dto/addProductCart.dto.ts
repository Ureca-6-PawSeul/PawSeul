import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddProductCartDto {
  @ApiProperty({ description: '추가할 제품 ID' })
  @IsNotEmpty({ message: '제품 ID는 필수입니다.' })
  @IsString({ message: '제품 ID는 문자열이어야 합니다.' })
  productId: string;

  @IsNotEmpty({ message: '수량은 필수입니다.' })
  @IsNumber({}, { message: '수량은 숫자여야 합니다.' })
  @ApiProperty({ description: '제품 수량' })
  quantity: number;
}
