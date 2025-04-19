// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS enabled
  app.enableCors();

  //  Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('Yatra Hotel API')
    .setDescription('Hotel booking APIs for Yatra Integration')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // ✅ Start server
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server ready at http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Swagger Docs at http://localhost:${process.env.PORT ?? 3000}/api-docs`);
}
bootstrap();



