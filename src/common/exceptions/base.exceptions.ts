import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ServiceUnavailableException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  static getExceptionInfo(exception: unknown) {
    console.log(exception instanceof Error, '内置错误');

    if (exception instanceof HttpException) {
      return {
        status: exception.getStatus(),
        message: exception.message,
      };
    } else {
      return {
        status: HttpStatus.SERVICE_UNAVAILABLE,
        message:
          exception instanceof Error
            ? exception.message
            : new ServiceUnavailableException().getResponse(),
      };
    }
  }
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('catch', exception);
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();
    request.log.error(exception);

    const { status, message } = AllExceptionsFilter.getExceptionInfo(exception);

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
