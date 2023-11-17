import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as nocache from 'nocache';
import { ValidationPipe } from '@nestjs/common';

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

  const configService = app.get<ConfigService>(ConfigService);
  checkEnvironment(configService);

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

  await app.listen(configService.get<string>('PORT'));
}

bootstrap();
