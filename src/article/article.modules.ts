import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';

@Module({
  controllers: [ArticleController],
})
export class ArticleModule {
  constructor() {
    console.log('Article模块注入');
  }
}
