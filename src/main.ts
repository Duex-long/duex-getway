import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AuthGuard } from './common/auth/auth.guard';
import { AllExceptionsFilter } from './common/exceptions/base.exceptions';
import TransformIntercetp from './common/intercept/transform.intercetp';

// 默认情况下，Fastify仅在 localhost 127.0.0.1 接口上监听（了解更多信息）。如果要接受其他主机上的连接，则应'0.0.0.0'在 listen() 呼叫中指定：
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { cors: true },
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformIntercetp());
  //@ts-ignore
  app.useGlobalGuards(new AuthGuard());
  // await app.listen(3280, '0.0.0.0');
  await app.listen(3280, (_, address) => {
    console.log(address);
  });
}
bootstrap();
