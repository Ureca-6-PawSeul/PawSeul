import { useMutation, useQuery } from '@tanstack/react-query';
import { getMypageInfo, patchPetInfo, PetInfoType } from '../mypage';
import { toast } from 'react-toastify';
import { Flex } from '@/components/common/Flex';
import { CheckIcon } from '@/assets/images/svgs';

export const useGetMypapgeInfo = () => {
    const {data} = useQuery({
        queryKey: ['getMypageInfo'],
        queryFn: () => getMypageInfo(),
    })

    return data
};

export const usePatchMypageInfo = (handleNavigate: () => void) => {
    const notify = () => {
        toast(
          <Flex justify="space-between">
            <span>수정이 완료되었습니다.</span>
            <CheckIcon width={24} height={24} />
          </Flex>,
          { position: 'bottom-center' },
        );
      };

      const { mutate } = useMutation({
        mutationKey: ['patchPetInfo'],
        mutationFn: (petInfo: PetInfoType) => patchPetInfo(petInfo),
        onSuccess: () => {
          notify();
          setTimeout(() => {
            handleNavigate();
          }, 1800);
        },
        onError: () => window.alert('수정에 실패하였습니다.'),
      });

      return { mutate };
}