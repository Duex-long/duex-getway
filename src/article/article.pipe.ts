import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ArticleInterface } from './articleType';

@Injectable()
export class ArticleItemPipe implements PipeTransform {
  transform(value: ArticleInterface, metadata: ArgumentMetadata) {
    this.validateDataisEmpty(value);
    return value;
  }

  validateDataisEmpty(val: ArticleInterface) {
    if (!val?.name || !val?.content) {
      throw new HttpException('请确认内容是否完整', HttpStatus.BAD_REQUEST);
    }
  }
}
