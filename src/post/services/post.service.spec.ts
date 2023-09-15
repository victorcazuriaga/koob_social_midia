import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from 'src/database/prisma.service';
import { PostEntity } from '../entities/post.entity';
import { AccountEntity } from 'src/account/entities/account.entity';
//TODO: passar para arquivo unico de mocks
const mockedUsersList = [
  {
    name: 'Pedro',
    email: 'pedro@example.com',
    password: '@Pedro2023',
    birthdate: '2000-01-01',
    biography: 'Esta é a biografia do usuário.',
  },
  {
    name: 'Ana',
    email: 'ana@example.com',
    password: '@Ana2023',
    birthdate: '2000-01-01',
    biography: 'Esta é a biografia do usuário.',
  },
  {
    name: 'Rafael',
    email: 'rafael@example.com',
    password: '@Rafael2023',
    birthdate: '2000-01-01',
    biography: 'Esta é a biografia do usuário.',
  },
];

describe('PostService', () => {
  let postService: PostService;
  let usersList: AccountEntity[];
  let postList: PostEntity[];
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, PrismaService],
    }).compile();
    postService = module.get<PostService>(PostService);

    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaService.account.deleteMany();
  });

  beforeEach(async () => {
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

  it('should account service be created', () => {
    expect(postService).toBeDefined();
  });

  it('should service create post', async () => {
    const user = usersList[0];
    const createdPost = await postService.create(user.id, {
      content: 'test create',
    });
    const expectedUser = new PostEntity(
      await prismaService.post.findUnique({
        where: { id: createdPost.id },
      }),
    );

    expect(createdPost).toEqual(expectedUser);
  });

  it('should service find post', async () => {
    const post = new PostEntity(postList[0]);
    const findUser = await postService.findOne(post.id);

    expect(findUser).toEqual(post);
  });
  it('should service find all post', async () => {
    const findAllPost = (await postService.findAll()).sort((a, b) =>
      a.content.localeCompare(b.content),
    );

    const expectedUser = PostEntity.handlerPostList(postList).sort((a, b) =>
      a.content.localeCompare(b.content),
    );
    expect(findAllPost).toEqual(expectedUser);
  });

  it('should service update post', async () => {
    const post = usersList[0].Post[0];
    const newPostData = {
      content: 'Test de update Post',
    };
    const updateUser = await postService.update(post.id, newPostData);
    const expectedUser = new PostEntity({ ...post, ...newPostData });
    expect(updateUser).toEqual(expectedUser);
  });

  it('should service remove post', async () => {
    const post = usersList[0].Post[0];

    await postService.remove(post.id);
    const expectedUser = await prismaService.post.findUnique({
      where: { id: post.id },
    });

    expect(null).toEqual(expectedUser);
  });
});
