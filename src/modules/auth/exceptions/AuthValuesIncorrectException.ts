import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../../exceptions/appException.js';

export class AuthValuesIncorrectException extends AppException {
  constructor() {
    super({
      message: 'Email ou senha incorretos',
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}
