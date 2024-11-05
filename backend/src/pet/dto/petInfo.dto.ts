import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class PetInfoDto {
  @ApiProperty({ description: '펫 이름' })
  @IsNotEmpty({ message: '펫 이름은 필수입니다.' })
  @IsString({ message: '펫 이름은 문자열이어야 합니다.' })
  petname: string;

  @ApiProperty({ description: '펫 무게' })
  @IsNotEmpty({ message: '펫 무게는 필수입니다.' })
  @IsNumber({}, { message: '펫 무게는 숫자여야 합니다.' })
  weight: number;

  @ApiProperty({ description: '펫 나이' })
  @IsNotEmpty({ message: '펫 나이는 필수입니다.' })
  @IsNumber({}, { message: '펫 나이는 숫자여야 합니다.' })
  age: number;
}
