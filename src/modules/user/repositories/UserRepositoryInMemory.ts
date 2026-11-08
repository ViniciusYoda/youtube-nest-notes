import type { User } from '../entities/User.js';
import type { UserRepository } from './UserRepository.js';

export class UserRepositoryInMemory implements UserRepository {
    public users: User[] = [];

    async create(user: User): Promise<void> {
        this.users.push(user);
    }
}

