import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

interface Response<T> {
  data: T;
}
@Injectable()
class TransformIntercetp<T> implements NestInterceptor<T, Response<T>> {
  did = 0;
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<Response<T>>> {
    console.log('拦截器', new Date().toISOString());
    return next.handle().pipe(
      map((data) => ({
        data,
        status: 0,
        extra: {},
        message: 'success',
        success: true,
      })),
    );
  }
}

export default TransformIntercetp;
