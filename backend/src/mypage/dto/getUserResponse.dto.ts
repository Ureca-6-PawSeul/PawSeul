// getUserResponse.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Pet } from 'src/entity/pet.entity';

export class GetUserResponseDto {
  @ApiProperty({ description: '사용자의 고유 ID' })
  userId: string;

  @ApiProperty({ description: '사용자 이름' })
  username: string;

  @ApiProperty({ description: '사용자 이메일' })
  email: string;

  @ApiProperty({ description: '사용자의 반려동물 정보', type: () => Pet })
  pet: Pet;
}
