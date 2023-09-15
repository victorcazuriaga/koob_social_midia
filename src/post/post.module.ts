import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { PrismaModule } from 'src/database/prisma.module';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';

@Module({
  imports: [PrismaModule],
  controllers: [PostController],
  providers: [PostService, PrismaService],

})
export class PostModule {}
