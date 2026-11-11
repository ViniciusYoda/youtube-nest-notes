import { HttpStatus } from '@nestjs/common';
import { AppException, AppExceptionProps } from './appException.js';

interface IncorrectValuesExceptionProps {
  fields: AppExceptionProps['fields'];
}

export class IncorrectValuesException extends AppException {
  constructor({ fields }: IncorrectValuesExceptionProps) {
    super({
      message: 'Dados inválidos',
      status: HttpStatus.BAD_REQUEST,
      fields,
    });
  }
}
