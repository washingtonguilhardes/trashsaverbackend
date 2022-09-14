import { HttpException, HttpStatus, Logger } from '@nestjs/common';

enum DefaultApplicationException {
  PARAMETER_NOT_FOUND = 'PARAMETER_NOT_FOUND',
  INVALID_PARAMETER = 'INVALID_PARAMETER',
  OBJECT_NOT_FOUND = 'OBJECT_NOT_FOUND',
}
export class ApplicationException extends HttpException {
  private exceptionCode = 'UNKNOW_ERROR';

  private logger = new Logger(ApplicationException.name);

  private metas: { value: string; key: string }[] = [];

  constructor(message: string, exceptionCode: string, code = HttpStatus.BAD_REQUEST) {
    super(message, code);
    this.exceptionCode = exceptionCode;
    if (process.env.NODE_ENV === 'development') {
      this.logger.error(`${code}: ${message}`);
    }
  }

  getExceptionCode() {
    return this.exceptionCode;
  }

  addMeta(key, value = '') {
    this.metas.push({ key, value });
  }

  getMetas() {
    return this.metas;
  }

  static parameterNotFound<T>(parameter: keyof T, message = '') {
    return new ApplicationException(
      `Campo '${String(parameter)}' não informado. ${message}`.trim(),
      DefaultApplicationException.PARAMETER_NOT_FOUND
    );
  }

  static invalidParameter<T = Record<string, string>>(parameter: keyof T, message = '') {
    return new ApplicationException(
      `Campo '${String(parameter)}' inválido. ${message}`.trim(),
      DefaultApplicationException.INVALID_PARAMETER
    );
  }

  static objectNotFound(message: string) {
    return new ApplicationException(
      message.trim(),
      DefaultApplicationException.OBJECT_NOT_FOUND
    );
  }
}
