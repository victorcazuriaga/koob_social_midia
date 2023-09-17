import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PrismaService } from 'src/database/prisma.service';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto): Promise<PostEntity> {
    return new PostEntity(await this.prisma.post.create({ data }));
  }

  async findAll(): Promise<PostEntity[]> {
    const allPosts = await this.prisma.post.findMany();
    return PostEntity.handlerPostList(allPosts);
  }

  async findOne(id: string): Promise<PostEntity> {
    try {
      const searchPostById = await this.prisma.post.findUnique({
        where: { id: id },
      });
      return new PostEntity(searchPostById);
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: string, data: UpdatePostDto): Promise<PostEntity> {
    try {
      const updateUserById = await this.prisma.post.update({
        where: { id: id },
        data,
      });
      return updateUserById;
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: string) {
    try {
      const deleteUserById = await this.prisma.post.delete({
        where: { id: id },
      });
      return deleteUserById;
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
