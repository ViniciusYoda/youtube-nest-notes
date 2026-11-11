import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../../exceptions/appException.js';

export class NoteNotFoundException extends AppException {
  constructor() {
    super({
      message: 'Anotação não encontrada',
      status: HttpStatus.NOT_FOUND,
    });
  }
}
