import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
// import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { graphqlUploadExpress } from 'graphql-upload-minimal';

async function bootstrap() {
  const PORT = process.env.PORT || 4002;
  // const cookieSecret = process.env.COOKIE_SECRET;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const allowedOrigins = [];
  app.use('/graphql', graphqlUploadExpress());

  const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe({}));
  // app.use(cookieParser(cookieSecret));
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    }),
  );

  await app.listen(PORT);
}
bootstrap();
