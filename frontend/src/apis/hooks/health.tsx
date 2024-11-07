import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NutrientType, postHealthInfo } from '../health';
import { HealthDataType } from '@/assets/types/AnalysisType';

export const usePostHealthInfo = (
  setNutrientData: (data: NutrientType) => void,
  handleErrorNavigate: () => void,
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['postHealthInfo'],
    mutationFn: async (healthInfo: HealthDataType) => {
      return await postHealthInfo(healthInfo);
    },
    onSuccess: (data) => {
      setNutrientData(data);
      queryClient.setQueryData<NutrientType>(['postHealthInfo'], data); // mutation 성공 시 캐시 업데이트
      // 캐시 시간을 늘려주기 위해 setQueryDefaults 사용
      queryClient.setQueryDefaults(['postHealthInfo'], {
        // cacheTime: 1000 * 60 * 60 * 24, // 24시간 동안 캐시 유지
        staleTime: 1000 * 60 * 60 * 6, // 1시간 동안 신선한 데이터로 간주
      });

    },
    onError: () => {
      window.alert('분석에 실패했습니다.');
      handleErrorNavigate();
    },
  });

  return mutation;
};
