import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import { ExampleModule } from './example/example.module';
import { testMicoProvider } from './microservicesProvider';
import { ArticleModule } from './article/article.modules';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import TransformIntercetp from './common/intercept/transform.intercetp';
import { AuthGuard } from './common/auth/auth.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ExampleModule,
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformIntercetp,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
