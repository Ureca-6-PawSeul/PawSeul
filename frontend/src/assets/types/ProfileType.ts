export interface PetType {
  petId: string
  petname: string;
  age: number;
  weight: number;
  gender: string;
  breed: string;
  isNeutered: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserType {
  user_id: number | string;
  username: string;
  email: string;
}
