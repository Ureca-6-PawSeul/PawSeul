export type Category = 'food' | 'supplement' | 'snack';

export enum SnackType {
  CAN = '캔/파우치',
  DRY = '건조간식',
  GUM = '껌/캔디',
  JERKY = '져키',
  NOT_SPECIFIED = '미표기',
}

export enum FoodType {
  DRY = '건식사료',
  WET = '습식사료',
  HOMEMADE = '수제사료',
  RAW = '건조생식사료',
  NOT_SPECIFIED = '미표기',
}

export enum SupplementType {
  CAPSULE = '캡슐',
  TABLET = '알약',
  STICK = '스틱',
  CHEWABLE = '츄어블',
  POWDER = '분말',
  NOT_SPECIFIED = '미표기',
  JELLY = '젤리',
}
