import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PayloadTooLargeException,
  RequestTimeoutException,
} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // throw Error('test')
    // throw new HttpException('testError', HttpStatus.SERVICE_UNAVAILABLE);
    // throw new PayloadTooLargeException('large', 'testLarge');
    return 'Hello World!';
  }
}
