import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from '../../../user/entities/User.js';
import type { UserPayload } from '../../models/UserPayload.js';

interface SignInRequest {
    user: User;
}

@Injectable()
export class SignInUseCase {
    constructor(private jwtService: JwtService) {}

    async execute({ user }: SignInRequest) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt.toJSON(),
        };

        const jwtToken = this.jwtService.sign(payload);

        return jwtToken;
    }
}