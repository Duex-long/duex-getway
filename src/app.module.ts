import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './common/auth/auth.module';
import { ExampleModule } from './example/example.module';
import { testMicoProvider } from './microservicesProvider';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import TransformIntercetp from './common/intercept/transform.intercetp';
import { DbModule } from './common/db/db.module';
import { AuthGuard } from './common/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ExampleModule,
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
