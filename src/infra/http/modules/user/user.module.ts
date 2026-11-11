import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase.js';
import { DatabaseModule } from '../../../database/database.module.js';
import { UserController } from './user.controller.js';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [CreateUserUseCase],
})
export class UserModule {}