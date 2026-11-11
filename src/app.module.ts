import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './infra/http/modules/auth/auth.module.js';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard.js';
import { DatabaseModule } from './infra/database/database.module.js';
import { UserModule } from './infra/http/modules/user/user.module.js';
import { NoteModule } from './infra/http/modules/note/note.module.js';
@Module({
  imports: [DatabaseModule, UserModule, AuthModule, NoteModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}