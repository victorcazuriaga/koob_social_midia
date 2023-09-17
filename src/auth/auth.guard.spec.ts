import { JwtService } from '@nestjs/jwt';
import { TestingModule, Test } from '@nestjs/testing';
import { AccountService } from 'src/account/services/account.service';
import { PrismaService } from 'src/database/prisma.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        AuthService,
        AccountService,
        PrismaService,
        JwtService,
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
