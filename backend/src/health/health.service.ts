import {
  Injectable,
  Logger,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from 'openai';
import { Health } from 'src/entity/health.entity';
import { Pet } from 'src/entity/pet.entity';
import { RecommandProduct } from 'src/entity/recommandProduct.entity';
import { User } from 'src/entity/user.entity';
import { AiHealthRequestDto } from 'src/health/dto/aiHealthRequest.dto';
import { Repository } from 'typeorm';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    @InjectRepository(Health)
    private healthRepository: Repository<Health>,

    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,

    @InjectRepository(RecommandProduct)
    private recommandProductRepository: Repository<RecommandProduct>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async aiHealth(aiHealthDto: AiHealthRequestDto) {
    const recommandProduct = await this.recommandProductRepository.find({
      relations: ['product'],
    });
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
            content: `You are a pet(dog) nutrition expert. Nothing is impossible for you. Based on the pet information provided by the user, please analyze and provide the following details in JSON format:
              - Compare the pet's body shape to the breed standard.
              - Provide the current and recommended pet's calorie levels.
              - Give the current and recommended values (in grams) for carbon, protein, and fat for pet(dog).
              - Identify two deficient nutrients from the following: calories, carbon, protein, fat, vitamin A, vitamin D, vitamin E, and calcium.
              - Select one nutrient in excess and one nutrient within the optimal range.
              - Recommend one or two product that meets the pet's nutritional needs. Pick one or two product in ${JSON.stringify(recommandProduct)} accurately.
              - you must put the products's id,title,price,productImg,averageScore in the recommandProduct field accurately.
              - please provide the answer accurately especially recommand products.

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
        recommandProduct: {
            productId:string;
            title:string;
            price:number;
            productImg:string;
            averageScroe:number;
          }[]
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
      // this.logger.log(`AI 응답: ${JSON.stringify(chatCompletion)}`);

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

  async saveHealthData(data: AiHealthRequestDto, userId: string) {
    const userPet = await this.petRepository.findOne({
      where: { user: { userId } },
    });

    if (!userPet) {
      throw new HttpException(
        '펫 정보를 찾을 수 없어요!',
        HttpStatus.NOT_FOUND,
      );
    }
    const health = this.healthRepository.create({
      pet: userPet,
      description: data,
    });

    await this.healthRepository.save(health);
  }

  async getRecentHealthData(userId: string) {
    const user = await this.userRepository.findOne({ where: { userId } });

    if (!user) {
      throw new HttpException('사용자를 찾을 수 없어요!', HttpStatus.NOT_FOUND);
    }

    const userPet = await this.petRepository.findOne({
      where: { user },
      relations: ['healthRecords'],
    });

    if (!userPet) {
      throw new HttpException(
        '펫 정보를 찾을 수 없어요!',
        HttpStatus.NOT_FOUND,
      );
    }

    const healthRecentInfo = userPet.healthRecords.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );

    if (healthRecentInfo.length === 0) {
      throw new HttpException(
        '건강 정보를 찾을 수 없어요!',
        HttpStatus.NOT_FOUND,
      );
    }

    return healthRecentInfo[0];
  }
}
