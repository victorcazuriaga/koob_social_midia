import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AccountModule, PostModule],
})
export class AppModule {}
