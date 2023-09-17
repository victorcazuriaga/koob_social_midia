import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountEntity } from '../entities/account.entity';
import { PrismaService } from 'src/database/prisma.service';

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

describe('AccountService', () => {
  let accountService: AccountService;
  let usersList: AccountEntity[];
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService, PrismaService],
    }).compile();
    accountService = module.get<AccountService>(AccountService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  beforeEach(async () => {
    await prismaService.account.deleteMany();

    usersList = await Promise.all(
      mockedUsersList.map(
        async (user) => await prismaService.account.create({ data: user }),
      ),
    );
  });

  it('should account service be created', () => {
    expect(accountService).toBeDefined();
  });

  it('should service create user', async () => {
    const user = {
      name: 'Douglas',
      email: 'douglas@example.com',
      password: '@Douglas2023',
      birthdate: '2000-01-01',
      biography: 'Esta é a biografia do usuário.',
    };
    const createdUser = await accountService.create(user);
    const expectedUser = new AccountEntity(
      await prismaService.account.findUnique({
        where: { id: createdUser.id },
      }),
    );

    expect(createdUser).toEqual(expectedUser);
  });

  it('should service find user', async () => {
    const user = new AccountEntity(usersList[0]);
    const findUser = await accountService.findOne(user.id);

    expect(findUser).toEqual(user);
  });
  it('should service find all user', async () => {
    const findAllUser = (await accountService.findAll()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const expectedUser = AccountEntity.handlerAccountList(usersList).sort(
      (a, b) => a.name.localeCompare(b.name),
    );
    expect(findAllUser).toEqual(expectedUser);
  });

  it('should service update user', async () => {
    const user = usersList[0];
    const newUserData = {
      name: 'Miguel Sampaio',
      biography: 'Teste de update user',
    };
    const updateUser = await accountService.update(user.id, newUserData);
    const expectedUser = new AccountEntity({ ...user, ...newUserData });
    expect(updateUser).toEqual(expectedUser);
  });

  it('should service remove user', async () => {
    const user = usersList[0];

    await accountService.remove(user.id);
    const expectedUser = await prismaService.account.findUnique({
      where: { id: user.id },
    });

    expect(null).toEqual(expectedUser);
  });
});
