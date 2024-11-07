import { useMutation, useQuery } from '@tanstack/react-query';
import { getHealthInfo, NutrientType, postHealthInfo } from '../health';
import { HealthDataType } from '@/assets/types/AnalysisType';

export const usePostHealthInfo = (
  setNutrientData: (data: NutrientType) => void,
  handleErrorNavigate: () => void,
) => {
  const mutation = useMutation({
    mutationKey: ['postHealthInfo'],
    mutationFn: (healthInfo: HealthDataType) => postHealthInfo(healthInfo),
    onSuccess: (data) => {
      setNutrientData(data);
    },
    onError: () => {
      window.alert('분석에 실패했습니다.');
      handleErrorNavigate();
    },
  });

  return mutation;
};

export const useGetHealthInfo = () => {
  const {data} = useQuery({
    queryKey: ['getHealthInfo'],
    queryFn: getHealthInfo,
  });
  return data;
};
