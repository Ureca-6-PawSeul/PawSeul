import client, { ResponseBody } from './client';

export interface PetInfoType {
  petname: string;
  age: number;
  weight: number;
  gender: string;
  isNeutered: string;
  breed: string;
}

interface PetResponse extends ResponseBody {
  data: PetInfoType;
}

export const patchPetInfo = async (pet: PetInfoType): Promise<PetResponse> => {
  const { data } = await client.patch('/user/me/pet', pet);
  return data;
};

export const getMypageInfo = async () => {
    const { data } = await client.get('user/me/pet', {
        withCredentials: true,
    })

   return data;
}