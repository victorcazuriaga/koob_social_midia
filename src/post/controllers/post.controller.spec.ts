import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PostService } from '../services/post.service';
import { AccountEntity } from 'src/account/entities/account.entity';
import { PostEntity } from '../entities/post.entity';
import { AccountService } from 'src/account/services/account.service';
import { JwtService } from '@nestjs/jwt';

const mockedUsersList = [
  {
    name: 'Test',
    email: 'teste321@teste.com',
    password: '@Test1234',
    birthdate: '1997-06-01',
    biography: 'Sou apenas um teste',
  },
  {
    name: 'Jane Doe',
    email: 'jane32@example.com',
    password: 'Password5678',
    birthdate: '1985-03-15',
    biography: 'Outro exemplo de usuário',
  },
  {
    name: 'Alice Smith',
    email: 'alice12@example.com',
    password: 'StrongPassword789',
    birthdate: '1990-12-10',
    biography: 'Mais um exemplo de usuário',
  },
];

describe('PostController', () => {
  let postController: PostController;
  let usersList: AccountEntity[];
  let postList: PostEntity[];
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [AccountService, PostService, PrismaService, JwtService],
    }).compile();

    postController = module.get<PostController>(PostController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prismaService.account.deleteMany();
    await prismaService.post.deleteMany();
    await Promise.all(
      mockedUsersList.map(
        async (user, index) =>
          await prismaService.account.create({
            data: {
              ...user,
              Post: { create: { content: `teste de criação ${index}` } },
            },
          }),
      ),
    );
    usersList = await prismaService.account.findMany({
      include: { Post: true },
    });
    postList = await prismaService.post.findMany();
  });

  it('should Post controller be defined', () => {
    expect(postController).toBeDefined();
  });
  it('should Post controller  create post', async () => {
    const user = usersList[0];
    const createdPost = await postController.create({
      content: 'test create',
      accountId: user.id,
    });
    const expectedUser = new PostEntity(
      await prismaService.post.findUnique({
        where: { id: createdPost.id },
      }),
    );

    expect(createdPost).toEqual(expectedUser);
  });

  it('should Post controller  find post', async () => {
    const post = new PostEntity(postList[0]);
    const findUser = await postController.findOne(post.id);

    expect(findUser).toEqual(post);
  });
  it('should Post controller  find all post', async () => {
    const findAllPost = (await postController.findAll()).sort((a, b) =>
      a.content.localeCompare(b.content),
    );

    const expectedUser = PostEntity.handlerPostList(postList).sort((a, b) =>
      a.content.localeCompare(b.content),
    );
    expect(findAllPost).toEqual(expectedUser);
  });

  it('should Post controller update post', async () => {
    const post = usersList[0].Post[0];
    const newPostData = {
      content: 'Test de update Post',
    };
    const updateUser = await postController.update(post.id, newPostData);
    const expectedUser = new PostEntity({ ...post, ...newPostData });
    expect(updateUser).toEqual(expectedUser);
  });

  it('should Post controller  remove post', async () => {
    const post = usersList[0].Post[0];

    await postController.remove(post.id);
    const expectedUser = await prismaService.post.findUnique({
      where: { id: post.id },
    });

    expect(null).toEqual(expectedUser);
  });
});
