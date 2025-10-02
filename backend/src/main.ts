import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.BACKEND_PORT ? Number(process.env.BACKEND_PORT) : 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Backend API listening on http://localhost:${port}`);
}

bootstrap();
