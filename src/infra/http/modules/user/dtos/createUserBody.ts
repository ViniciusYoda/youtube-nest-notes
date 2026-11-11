import { IsEmailCustom } from '../../../classValidator/decorators/IsEmailCustom.js';
import { IsNotEmptyCustom } from '../../../classValidator/decorators/IsNotEmptyCustom.js';
import { IsStringCustom } from '../../../classValidator/decorators/IsStringCustom.js';
import { MinLengthCustom } from '../../../classValidator/decorators/MinLengthCustom.js';

export class CreateUserBody {
  @IsStringCustom()
  @IsNotEmptyCustom()
  @IsEmailCustom()
  email: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @MinLengthCustom(6)
  password: string;
}
