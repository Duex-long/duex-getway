import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { FastifyRequest } from 'fastify';

interface Response<T> {
  data: T;
}
@Injectable()
class TransformIntercetp<T> implements NestInterceptor<T, Response<T>> {
  did = 0;
<<<<<<< HEAD
=======

>>>>>>> 98400c619caae18dfa9c2000721c9e767c30eebe
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<Response<T>>> {
    const ip = context.switchToHttp().getRequest<FastifyRequest>().ip;
    // const ip = socket.
    const startTime = new Date().getTime();
    console.log(`来自${ip}请求-------> `, new Date().toISOString());
    return next.handle().pipe(
      map((data) => ({
        from: ip,
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
