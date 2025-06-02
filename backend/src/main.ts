import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { seedAdmin } from './seed/admin.seed';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: "http://127.0.0.1:3000",
      credentials: true,
    },
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Cinerex Project')
    .setDescription('API para el proyecto Cinerex')
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Intentar lo del usuario admin al iniciar la aplicación
  const dataSource = app.get(DataSource);
  if (process.env.SEED_ADMIN === 'true') {
    await seedAdmin(dataSource);
  }

  await app.listen(3000);
}
bootstrap();
