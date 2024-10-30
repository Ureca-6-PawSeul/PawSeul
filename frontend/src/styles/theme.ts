import { typo } from './typo';
import { tag } from './tag';

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