import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AccountModule } from 'src/account/account.module';
import { jwtConstants } from 'src/constants/jwt';
import { AccountService } from 'src/account/services/account.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [
    AccountModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AccountService, AuthService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
