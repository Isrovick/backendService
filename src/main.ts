import { ExpressAdapter } from '@nestjs/platform-express';

require('dotenv').config();
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as pkg from '../package.json';
const DEFAULT_PATH = '/';

export async function bootstrap(adapter: AbstractHttpAdapter) {
  const { API_DOC = true, API_BASE_PATH = DEFAULT_PATH } = process.env;
  const app = await NestFactory.create(AppModule, adapter);
  if (API_BASE_PATH !== DEFAULT_PATH) app.setGlobalPrefix(API_BASE_PATH);
  if (API_DOC) {
    const config = new DocumentBuilder()
      .setTitle('BACKEND | Nest')
      .setDescription('API for frontendService')
      .setVersion(pkg.version)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(API_BASE_PATH, app, document);
    return app;
  }
}

if (require.main === module) {
  bootstrap(new ExpressAdapter())
    .then(async (app) => {
      await app.listen(process.env.API_PORT || 5080);
      console.log(
        `App (${pkg.name}:v${
          pkg.version
        }) is running on: ${await app.getUrl()}`,
      );
    })
    .catch((err) => {
      console.error(err);
    });
}
