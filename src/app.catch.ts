import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AbstractHttpAdapter } from '@nestjs/core';
import { ApplicationException } from './app.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: AbstractHttpAdapter) {}

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException ? exception.getResponse() : exception.message;
    const exceptionCode =
      exception instanceof ApplicationException
        ? exception.getExceptionCode()
        : exception.code || 'UNKNOW';

    const metas = exception instanceof ApplicationException ? exception.getMetas() : [];

    const response =
      typeof message === 'string'
        ? {
            statusCode: httpStatus,
            message,
            error: 'Bad Request',
          }
        : message;
    const path = this.httpAdapter.getRequestUrl(ctx.getRequest());
    const method = this.httpAdapter.getRequestMethod(ctx.getRequest());

    const logger = new Logger(`${method}(${path})`);

    const responseBody = {
      statusCode: httpStatus,
      exceptionCode,
      response,
      timestamp: new Date().toISOString(),
      path,
      method,
      metas,
    };
    logger.error(response.message);
    this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
