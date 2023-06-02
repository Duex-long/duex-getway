import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { DbModule } from 'src/common/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
