import { typo } from './typo';

export interface TypeOfTheme {
  typo: TypeOfTypo;
}

export const theme: TypeOfTheme = {
  typo,
};

export type TypeOfTypo = typeof typo;
export type KeyOfTypo = keyof typeof typo;
