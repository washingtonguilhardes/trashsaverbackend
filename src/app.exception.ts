import { HttpException, HttpStatus, Logger } from '@nestjs/common';

enum DefaultApplicationException {
  PARAMETER_NOT_FOUND = 'PARAMETER_NOT_FOUND',
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  OBJECT_NOT_FOUND = 'OBJECT_NOT_FOUND',
  EXECUTION_EXCEPTION = 'EXECUTION_EXCEPTION',
  VALIDATION_EXCEPTION = 'VALIDATION_EXCEPTION',
}
export class ApplicationException extends HttpException {
  private exceptionCode = 'UNKNOW_ERROR';

  private logger = new Logger(ApplicationException.name);

  private metas: { value: string; key: string }[] = [];

  private errors: string[] = [];

  constructor(
    message: string,
    exceptionCode: string,
    code = HttpStatus.BAD_REQUEST,
    previous?: Error & { errors?: string[] }
  ) {
    super(message, code);
    this.exceptionCode = exceptionCode;
    this.logger.error(`[${code}]: ${message}`);
    if (previous) {
      this.errors = previous.errors ?? [previous.message];
      this.logger.error(
        `[PREVIOUS] ${previous.name}: ${previous.message}, ${previous.errors?.join(', ')}`
      );
      this.logger.error(previous.stack);
    }
  }

  getExceptionCode() {
    return this.exceptionCode;
  }

  getErrors() {
    return this.errors;
  }

  addMeta(key, value = '') {
    this.metas.push({ key, value });
  }

  getMetas() {
    return this.metas;
  }

  static parameterNotFound<T>(parameters: Array<keyof T>, message = '') {
    return new ApplicationException(
      `Parameters '${parameters.join()}' not found on request body. ${message}`.trim(),
      DefaultApplicationException.PARAMETER_NOT_FOUND
    );
  }

  static invalidParameter<T = Record<string, string>>(
    parameters: Array<keyof T>,
    message = ''
  ) {
    return new ApplicationException(
      `Invalid parameters ${parameters.join()}. ${message}`.trim(),
      DefaultApplicationException.INVALID_PARAMETER
    );
  }

  static objectNotFound(message: string) {
    return new ApplicationException(
      message.trim(),
      DefaultApplicationException.OBJECT_NOT_FOUND
    );
  }

  static executionException(message: string, previous?: Error & { errors?: string[] }) {
    return new ApplicationException(
      message.trim(),
      DefaultApplicationException.EXECUTION_EXCEPTION,
      HttpStatus.INTERNAL_SERVER_ERROR,
      previous
    );
  }

  static validationException(message: string, previous?: Error & { errors?: string[] }) {
    return new ApplicationException(
      message.trim(),
      DefaultApplicationException.EXECUTION_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      previous
    );
  }
}
