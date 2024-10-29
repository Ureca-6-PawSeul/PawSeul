export interface CardProfileType {
  petname: string;
  age: number;
  weight: number;
  gender: string;
  breedname: string;
  is_neutered: string;
}
export interface ProfileType extends CardProfileType {
  user_id: number | string;
  username: string;
  pet_id: number;
}
