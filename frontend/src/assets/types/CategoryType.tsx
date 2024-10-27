export type Category = '사료' | '간식' | '영양제';

interface SubCategories {
  [key: string]: string[];
}

export const subCategories: SubCategories = {
  사료: ['전체', '건식', '수제', '건조생식'],
  간식: ['전체', '캔/파우치', '건조간식', '져키'],
  영양제: ['전체', '캡슐', '알약', '스틱', '츄어블', '분말'],
};