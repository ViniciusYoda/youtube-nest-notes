import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase.js';
import { CreateUserBody } from './dtos/createUserBody.js';
import { UserViewModel } from './viewModel/userViewModel.js';

@Controller('users')
export class UserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    @Post()
    async create(@Body() body: CreateUserBody) {
        const { name, email, password } = body;

        const user = await this.createUserUseCase.execute({
            name,
            email,
            password,
        });

        return UserViewModel.toHttp(user);
    }
}