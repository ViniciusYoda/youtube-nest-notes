import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from '../../../classValidator/decorators/IsNotEmptyCustom.js';
import { IsStringCustom } from '../../../classValidator/decorators/IsStringCustom.js';

export class EditNoteBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  title: string;

  @IsStringCustom()
  @IsOptional()
  description?: string;
}
