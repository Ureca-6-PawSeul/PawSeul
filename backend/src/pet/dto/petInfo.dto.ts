import { ApiProperty } from '@nestjs/swagger';

export class PetInfoDto {
  @ApiProperty({ description: '펫 이름' })
  petname: string;

  @ApiProperty({ description: '펫 무게' })
  weight: number;

  @ApiProperty({ description: '펫 나이' })
  age: number;
}
