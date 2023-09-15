import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostService } from '../services/post.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(AuthGuard)
  @Post(':accountId')
  create(
    @Param('accountId') accountId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.create(accountId, createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
