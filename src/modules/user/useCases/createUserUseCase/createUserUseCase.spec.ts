import { compare } from 'bcrypt';
import { beforeEach, describe, expect, it } from 'vitest';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory.js';
import { CreateUserUseCase } from './createUserUseCase.js';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Vitor',
      password: '123123',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to create user with a hashed password', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Vitor',
      password: userPasswordWithoutEncryption,
    });

    expect(user.password).not.toBe(userPasswordWithoutEncryption);

    const passwordMatches = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );

    expect(passwordMatches).toBe(true);
  });
});
