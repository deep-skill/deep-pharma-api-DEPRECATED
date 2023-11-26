import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as nocache from 'nocache';

import { AppModule } from '@/app.module';
import { setupSwagger } from '@/swagger';

function checkEnvironment(configService: ConfigService) {
  const requiredEnvVariables = ['PORT', 'ISSUER_BASE_URL', 'AUDIENCE'];

  requiredEnvVariables.forEach((envVariable) => {
    if (!configService.get<string>(envVariable)) {
      throw Error(`Undefined environment variable: ${envVariable}`);
    }
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(nocache());

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);
  checkEnvironment(configService);

  setupSwagger(app);

  await app.listen(configService.get<string>('PORT'));
}

bootstrap();
