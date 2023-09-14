import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AccountModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
