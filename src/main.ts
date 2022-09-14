// eslint-disable-next-line @typescript-eslint/no-var-requires
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import 'isomorphic-fetch';
import { AllExceptionsFilter } from './app.catch';
import { AppModule } from './app.module';

async function bootstrap() {
  console.group('ENV');
  console.log(JSON.stringify(process.env));
  console.groupEnd();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.use(compression());

  await app.listen(app.get(ConfigService).get('PORT') ?? 3000);
}
bootstrap();
