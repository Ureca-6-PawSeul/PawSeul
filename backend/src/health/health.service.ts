import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from 'openai';
import { Health } from 'src/entity/health.entity';
import { AiHealthRequestDto } from 'src/health/dto/aiHealthRequest.dto';
import { Repository } from 'typeorm';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    @InjectRepository(Health)
    private healthRepository: Repository<Health>,
  ) {}

  async aiHealth(aiHealthDto: AiHealthRequestDto) {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    try {
      // OpenAI API 호출
      const chatCompletion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // 모델 이름을 확인하세요.
        messages: [
          {
            role: 'system',
            content: `You are a pet nutrition expert. Nothing is impossible for you. Based on the pet information provided by the user, please analyze and provide the following details in JSON format:
              - Compare the pet's body shape to the breed standard.
              - Provide the current and recommended calorie levels.
              - Give the current and recommended values (in grams) for carbon, protein, and fat.
              - Identify two deficient nutrients from the following: calories, carbon, protein, fat, vitamin A, vitamin D, vitamin E, and calcium.
              - Select one nutrient in excess and one nutrient within the optimal range.
              Your answer must always be PetNutrientStatus in JSON format and do not use \`\, I will provide JSON type :
      type NutrientName = '칼로리' | '탄수화물' | '단백질' | '지방' | '비타민A' | '비타민D' | '비타민E' | '칼슘';
      type Nutrient = {
        current: number;        // 현재 양 (그램 또는 칼로리)
        recommended: number;     // 권장 양 (그램 또는 칼로리)
      };
      type PetStatusType = "마름" | "적정" | "비만";
      type PetNutrientStatus = {
        petStatus: PetStatusType;
        calories: Nutrient;
        carbon: Nutrient;
        protein: Nutrient;
        fat: Nutrient;
        vitaminA: Nutrient;
        vitaminD: Nutrient;
        vitaminE: Nutrient;
        calcium: Nutrient;
        deficientNutrients: [NutrientName, NutrientName];
        excessNutrient: NutrientName;
        optimalNutrient: NutrientName;
      };
       `,
          },
          {
            role: 'user',
            content: `${JSON.stringify(aiHealthDto)}`,
          },
        ],
      });

      // API 호출 결과 로깅
      this.logger.log(`AI 응답: ${JSON.stringify(chatCompletion)}`);

      const answer = chatCompletion.choices[0].message.content;

      // JSON 형식 응답 파싱
      return JSON.parse(answer.replace(/```json|```/g, '').trim());
    } catch (error) {
      // 오류 처리
      this.logger.error('OpenAI API와의 상호작용 중 오류 발생', error.stack);
      throw new InternalServerErrorException(
        '요청을 처리하는 중에 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      );
    }
  }
}