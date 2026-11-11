import { Module } from '@nestjs/common';
import { NoteRepository } from '../../modules/note/repositories/noteRepository.js';
import { UserRepository } from '../../modules/user/repositories/UserRepository.js';
import { PrismaNoteRepository } from './prisma/repositories/PrismaNoteRepository.js';
import { PrismaUserRepository } from './prisma/repositories/PrismaUserRepository.js';
import { PrismaService } from './prisma/prisma.service.js';
@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: NoteRepository,
      useClass: PrismaNoteRepository,
    },
  ],
  exports: [UserRepository, NoteRepository],
})
export class DatabaseModule {}