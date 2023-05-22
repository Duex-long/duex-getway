import { Controller, Get } from '@nestjs/common';

@Controller('article')
export class ArticleController {
  @Get('getArticleList')
  async getArticleList() {
    return ['test'];
  }
}
