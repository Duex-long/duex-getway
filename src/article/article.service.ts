import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  Collection,
  MongoClient,
  OptionalId,
  Document,
  Filter,
  ObjectId,
} from 'mongodb';
import { ArticleInterface } from './articleType';

@Injectable()
export class ArticleService {
  db: Collection<Document>;
  constructor(@Inject('MongoDB_Providers') mgClient: MongoClient) {
    this.db = mgClient.db('ArticleList').collection('Article');
  }
  /**  查询内容 */
  async getArticleList(page: number, total: number) {
    try {
      const idx = (page - 1) * total;
      const list = await this.db.find().toArray();
      const result = list.slice(idx, total * page);
      return {
        result,
        length: result.length,
        total: list.length,
        page,
      };
    } catch {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }
  /**  增加内容 */
  async addArticleItem(article: ArticleInterface) {
    const config = this.articleFactory(article);
    try {
      await this.db.insertOne(config, {});
    } catch {
      throw new HttpException('增加内容失败', HttpStatus.BAD_REQUEST);
    }
  }
  /** 删除内容 */
  async deleteArticle(id: string) {
    const status = await this.db.findOneAndDelete({
      _id: new ObjectId(id),
    });
    return status.ok ? '删除成功' : '删除失败';
  }
  /** 单个查找 */
  async findoneArticle(id: string) {
    return await this.db.findOne({
      _id: new ObjectId(id),
    } as unknown as Filter<Document>);
  }
  /** 更新内容 */
  async updateArticle(id: string, article: ArticleInterface) {
    try {
      await this.db.findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            name: article.name,
            content: article.content,
            updateTime: new Date(),
          },
        },
      );
      return '更新成功';
    } catch (e) {
      return '更新失败';
    }
  }
  /** 内容工厂 */
  articleFactory(article: Omit<ArticleInterface, '_id'>) {
    const currentTime = new Date();
    const articleConfig: OptionalId<Document> = {
      createTime: currentTime,
      updateTime: currentTime,
      ...article,
    };
    return articleConfig;
  }
}
