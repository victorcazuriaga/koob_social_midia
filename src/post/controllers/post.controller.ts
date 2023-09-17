import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostService } from '../services/post.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('posts')
@ApiTags('posts')
@ApiBearerAuth()
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Create Post',
    description: 'endpoint to create post',
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List All Post',
    description: 'endpoint to list all posts',
  })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'List Post by Id',
    description: 'endpoint to get post by id',
  })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @ApiOperation({
    summary: 'Update Post by Id',
    description: 'endpoint to update post by id',
  })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Post by Id',
    description: 'endpoint to delete post by id',
  })
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
