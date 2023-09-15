import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { AccountController } from './controllers/account.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AccountController],
  providers: [AccountService, PrismaService],

})
export class AccountModule {}
