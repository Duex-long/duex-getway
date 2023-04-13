import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

interface Response<T> {
  data: T;
}
@Injectable()
class TransformIntercetp<T> implements NestInterceptor<T, Response<T>> {
  did = 0;
  constructor(private authService: AuthService) {
    console.log('拦截器注入authService');
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<Response<T>>> {
    // this.authService.refresh();
    console.log(`${context.getType()}请求-------> `, new Date().toISOString());
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
