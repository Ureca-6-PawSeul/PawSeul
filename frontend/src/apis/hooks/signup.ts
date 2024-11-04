import { useMutation } from '@tanstack/react-query';
import { PetInfoType, postPetInfo } from '../signup';

export const usePostPetInfo = (notify: (content: string) => void) => {
  const { mutate } = useMutation({
    mutationKey: ['postPetInfo'],
    mutationFn: (petInfo: PetInfoType) => postPetInfo(petInfo),
    onSuccess: () => notify('회원가입 완료되었습니다.'),
    onError: () => window.alert('펫 등록에 실패하였습니다.'),
  });

  return { mutate };
};
