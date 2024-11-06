import { HealthDataType } from '@/assets/types/AnalysisType';
import client, { ResponseBody } from './client';

interface Nutrient {
  current: number;
  recommended: number;
}

export interface NutrientType {
  petStatus: string;
  calories: Nutrient;
  carbon: Nutrient;
  protein: Nutrient;
  fat: Nutrient;
  vitaminA: Nutrient;
  vitaminD: Nutrient;
  vitaminE: Nutrient;
  calcium: Nutrient;
  deficientNutrients: string[];
  excessNutrient: string;
  optimalNutrient: string;
}

export interface HealthResponse extends ResponseBody {
  data: NutrientType;
}

export const postHealthInfo = async (
  healthData: HealthDataType,
): Promise<NutrientType> => {
  const { data } = await client.post('/health/ai', healthData);
  return data;
};
