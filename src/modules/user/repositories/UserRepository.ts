import type { User } from '../entities/User.js';

export abstract class UserRepository {
    abstract create(user: User): Promise<void>;
}
