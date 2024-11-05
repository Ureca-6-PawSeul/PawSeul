import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/configs/setupSwagger';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 80;

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.setGlobalPrefix('api/v1'); // 모든 경로에 'api/v1'을 추가합니다.
  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);

  logger.log(`Application is running on: ${port}`);
}
bootstrap();
