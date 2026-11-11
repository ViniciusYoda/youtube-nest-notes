import type { Request } from 'express';
import type { User } from '../../../../../modules/user/entities/User.js';

export interface AuthRequestModel extends Request {
  user: User;
}