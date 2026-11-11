import { Injectable } from '@nestjs/common';
import { User } from '../../../../modules/user/entities/User.js';
import { UserRepository } from '../../../../modules/user/repositories/UserRepository.js';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper.js';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class PrismaUserRepository extends UserRepository {
    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async create(user: User): Promise<void> {
        const userRaw = PrismaUserMapper.toPrisma(user);

        await this.prisma.user.create({
            data: userRaw,
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) return null;

        return PrismaUserMapper.toDomain(user);
    }
}