import { useMutation } from '@tanstack/react-query';
import { PetInfoType, postPetInfo } from '../signup';
import { toast } from 'react-toastify';
import { Flex } from '@components/common/Flex';
import { CheckIcon } from '@/assets/images/svgs';

export const usePostPetInfo = (handleNavigate: () => void) => {
  const notify = () => {
    toast(
      <Flex justify="space-between">
        <span>회원가입 완료되었습니다.</span>
        <CheckIcon width={24} height={24} />
      </Flex>,
      { position: 'bottom-center' },
    );
  };

  const { mutate } = useMutation({
    mutationKey: ['postPetInfo'],
    mutationFn: (petInfo: PetInfoType) => postPetInfo(petInfo),
    onSuccess: () => {
      notify();
      setTimeout(() => {
        handleNavigate();
      }, 1800);
    },
    onError: () => window.alert('펫 등록에 실패하였습니다.'),
  });

  return { mutate };
};
