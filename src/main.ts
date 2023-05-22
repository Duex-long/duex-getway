import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AuthGuard } from './common/auth/auth.guard';
import { AllExceptionsFilter } from './common/exceptions/base.exceptions';
import TransformIntercetp from './common/intercept/transform.intercetp';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformIntercetp());
  // @ts-ignore
  app.useGlobalGuards(new AuthGuard());
  await app.listen(3000);
}
bootstrap();
