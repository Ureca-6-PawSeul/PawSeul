import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('PawSeul API')
    .setDescription('PawSeul의 api 문서입니다.')
    .setVersion('1.0.0')
    .addCookieAuth('accessToken', {
      type: 'apiKey',
      in: 'cookie',
      name: 'accessToken',
      description:
        process.env.NODE_ENV === 'development'
          ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNzY1MjYxMTE4IiwiZW1haWwiOiJkaGU3NzcwMEBkYXVtLm5ldCIsInVzZXJuYW1lIjoi7Zes66Gk7J2064ukIiwiaWF0IjoxNzMwNjAzODkzLCJleHAiOjE3MzA2NDcwOTN9.2Tzxup-M_KCg6CjR9X1DS-j_jcw_DodMqlurAaerOjo'
          : 'accessToken을 입력하세요!',
    })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
};
