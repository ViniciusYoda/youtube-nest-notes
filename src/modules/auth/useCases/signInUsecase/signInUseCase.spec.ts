import { User } from '../../../user/entities/User.js';
import { SignInUseCase } from './signInUseCase.js';
import { JwtService } from '@nestjs/jwt';
import type { UserPayload } from '../../models/UserPayload.js';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sign in', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it('Should be able to create valid access_token', async () => {
    const user = new User({
      email: 'user@email.com',
      name: 'User',
      password: 'password',
    });

    const token = await signInUseCase.execute({
      user,
    });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});