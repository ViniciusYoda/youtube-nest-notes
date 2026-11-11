import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../../../modules/auth/strategies/jwt.strategy.js';
import { LocalStrategy } from '../../../../modules/auth/strategies/local.strategy.js';
import { SignInUseCase } from '../../../../modules/auth/useCases/signInUsecase/signInUseCase.js';
import { ValidateUserUseCase } from '../../../../modules/auth/useCases/validateUserUseCase/validateUserUseCase.js';
import { DatabaseModule } from '../../../database/database.module.js';
import { UserModule } from '../user/user.module.js';
import { AuthController } from './auth.controller.js';
import { SignInDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware.js';

function getJwtExpiration(): number | undefined {
    const expiresIn = process.env.JWT_EXPIRE;
    if (!expiresIn) return undefined;

    const seconds = Number(expiresIn);
    if (!Number.isSafeInteger(seconds) || seconds <= 0) {
        throw new Error('JWT_EXPIRE must be a positive integer in seconds');
    }

    return seconds;
}

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: getJwtExpiration() },
        }),
    ],
    controllers: [AuthController],
    providers: [LocalStrategy, ValidateUserUseCase, SignInUseCase, JwtStrategy],
})
export class AuthModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SignInDTOValidateMiddleware).forRoutes('signIn');
    }
}