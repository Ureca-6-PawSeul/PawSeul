import { typo } from './themes/typo';
import { tag } from './themes/tag';

export interface TypeOfTheme {
  typo: TypeOfTypo;
  tag: TypeOfTag;
}

export const theme: TypeOfTheme = {
  typo,
  tag,
};

export type TypeOfTypo = typeof typo;
export type KeyOfTypo = keyof typeof typo;
export type TypeOfTag = typeof tag;
export type KeyOfTag = keyof typeof tag;
