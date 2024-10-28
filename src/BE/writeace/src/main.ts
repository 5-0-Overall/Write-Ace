import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Replace with your frontend's origin
    credentials: true, // Enable if you're using cookies or authentication
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  const config = new DocumentBuilder()
    .setTitle('WriteAce API')
    .setDescription('The WriteAce API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that are not part of the DTO
      forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are found
      transform: true, // Automatically transforms payloads to be objects typed according to their DTOs
      transformOptions: {
        enableImplicitConversion: true, // Cho phép chuyển đổi implicit
      },
    }),
  );
  SwaggerModule.setup('docs', app, document);
  await app.init();
  await app.listen(3000);
}
bootstrap();
