export interface PetInfo {
  petId: string;
  petname: string;
  age: number;
  weight: number | string;
  gender: string;
  isNeutered: string;
  breed: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfo {
  userId: string;
  username: string;
  email: string;
  pet: PetInfo;
}

export interface UserStore {
  user: UserInfo | null;
  setUserInfo: (user: UserInfo) => void;
}
