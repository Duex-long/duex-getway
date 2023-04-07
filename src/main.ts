import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AuthGuard } from './common/auth/auth.guard';
import { AllExceptionsFilter } from './common/exceptions/base.exceptions';
import TransformIntercetp from './common/intercept/transform.intercetp';
import { logger } from './common/log/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformIntercetp());
  app.useGlobalGuards(new AuthGuard());
  app.use(logger);
  await app.listen(6666);
}
bootstrap();
