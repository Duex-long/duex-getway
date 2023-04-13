import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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
    const {
      headers: { host },
    } = context.switchToHttp().getRequest();

    const startTime = new Date().getTime();
    console.log(`来自${host}请求-------> `, new Date().toISOString());
    return next.handle().pipe(
      map((data) => ({
        from: host,
        duration: ((new Date().getTime() - startTime) / 1000).toFixed(2) + 's',
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
