export interface UserInfo {
  userId: string;
  username: string;
  email: string;
}

export interface PetInfo {
  petId: string;
  petname: string;
  age: number;
  weight: number;
  gender: string;
  isNeutered: string;
  allergies: string[];
  healthRecords: string[];
  breed: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStore {
  user: UserInfo | null;
  pet: PetInfo | null;
  setUserInfo: (user: UserInfo) => void;
  setPetInfo: (pet: PetInfo) => void;
}
