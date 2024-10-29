import { ApiProperty } from '@nestjs/swagger';

export class CreateSupplementDto {
  @ApiProperty({ description: '카테고리' })
  category: string;

  @ApiProperty({ description: '제품 이미지 URL' })
  productImg: string;

  @ApiProperty({ description: '제품 제목' })
  title: string;

  @ApiProperty({ description: '제품 가격' })
  price: number;

  @ApiProperty({ description: '설명 이미지 목록', type: [String] })
  descriptionImg: string[];

  @ApiProperty({ description: '주 원료' })
  mainIngredient: string;

  @ApiProperty({ description: '기능성 (예: 치석 제거)' })
  productFunction: string;

  @ApiProperty({ description: '대상 연령' })
  targetAge: string;

  @ApiProperty({ description: '사료 타입 (예: 건식사료, 습식사료 등)' })
  supplementType: string;
}
