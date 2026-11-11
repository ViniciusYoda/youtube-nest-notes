import { User } from '../../../../../modules/user/entities/User.js';
export class UserViewModel {
  static toHttp({ createdAt, email, id, name }: User) {
    return {
      id,
      email,
      name,
      createdAt,
    };
  }
}