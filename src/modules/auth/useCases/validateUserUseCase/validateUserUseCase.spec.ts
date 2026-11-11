import { hash } from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../../../user/entities/User.js';
import { UserRepositoryInMemory } from '../../../user/repositories/UserRepositoryInMemory.js';
import { ValidateUserUseCase } from './validateUserUseCase.js';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to return user when credentials are correct', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = new User({
      email: 'user@email.com',
      name: 'User',
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('Should be able to throw error when credentials incorrect', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = new User({
      email: 'user@email.com',
      name: 'User',
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryInMemory.users = [user];

    await expect(
      validateUserUseCase.execute({
        email: 'incorrect@gmail.com',
        password: userPasswordWithoutEncryption,
      }),
    ).rejects.toThrow(UnauthorizedException);

    await expect(
      validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect password',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});