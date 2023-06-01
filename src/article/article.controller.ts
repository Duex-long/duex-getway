import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleItemPipe } from './article.pipe';
import { ArticleInterface } from './articleType';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  /**  查询内容 */
  @Get('getArticleList')
  async getArticleList() {
    return this.articleService.getArticleList();
  }
  /**  增加内容 */
  @Post('addArticle')
  @UsePipes(new ArticleItemPipe())
  async addArticleItem(@Body() article: ArticleInterface) {
    return this.articleService.addArticleItem(article);
  }
  /** 删除内容 */
  @Delete('deleteArticle:id')
  async deleteArticle(@Param('id') id: string) {
    return await this.articleService.deleteArticle(id);
  }
  /** 修改内容 */
  @Post('updateArticle')
  @UsePipes(new ArticleItemPipe())
  async updateArticle(@Body() article: ArticleInterface) {
    if (!article.id) return '更新失败';
    return this.articleService.updateArticle(article.id, article);
  }
}
