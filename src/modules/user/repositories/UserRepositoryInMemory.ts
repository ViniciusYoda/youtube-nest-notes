import type { User } from '../entities/User.js';
import type { UserRepository } from './UserRepository.js';

export class UserRepositoryInMemory implements UserRepository {
    public users: User[] = [];

    async create(user: User): Promise<void> {
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find((user) => user.email === email);

        if (!user) return null;

        return user;
    }
}
