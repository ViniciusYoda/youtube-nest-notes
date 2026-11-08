import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository.js';
import { User } from '../../entities/User.js';
import { hash } from 'bcrypt';

interface CreateUserRequest {
    email: string;
    password: string;
    name: string;
}

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    async execute({ email, name, password }: CreateUserRequest): Promise<User> {
        const user = new User({
            email,
            name,
            password: await hash(password, 10),
        });

        await this.userRepository.create(user);

        return user;
    }
}
