import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AccountModule, PostModule, AuthModule],
})
export class AppModule {}
