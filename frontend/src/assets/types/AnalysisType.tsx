import { PetInfo } from './UserInfoType';

export interface FoodItem {
  product_id: number;
  title: string;
  cal: number;
  carbon: number;
  protein: number;
  fat: number;
  vitaminA: number;
  vitaminD: number;
  vitaminE: number;
  calcium: number;
}

export interface SnackItem {
  index: number;
  title: string;
  cal: number;
  carbon: number;
  protein: number;
  fat: number;
  vitaminA: number;
  vitaminD: number;
  vitaminE: number;
  calcium: number;
}

export type Allergy = {
  id: number;
  name: string;
};

export type AllergyItem = Allergy[];

type PartialPetInfo = Pick<PetInfo, 'age' | 'breed' | 'weight' | 'gender'>;

export interface HealthDataType {
  allergy: AllergyItem;
  food: FoodItem;
  snack: SnackItem;
  pet: PartialPetInfo;
}
