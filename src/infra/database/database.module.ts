import { Module } from '@nestjs/common';
import { UserRepository } from '../../modules/user/repositories/UserRepository.js';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository.js';
import { PrismaService } from './prisma/prisma.service.js';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}