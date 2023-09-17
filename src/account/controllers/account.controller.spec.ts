import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../services/account.service';
import { PrismaService } from 'src/database/prisma.service';
import { AccountEntity } from '../entities/account.entity';

const mockedUsersList = [
  {
    name: 'Test',
    email: 'teste@teste.com',
    password: '@Test1234',
    birthdate: '1997-06-01',
    biography: 'Sou apenas um teste',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'Password5678',
    birthdate: '1985-03-15',
    biography: 'Outro exemplo de usuário',
  },
  {
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'StrongPassword789',
    birthdate: '1990-12-10',
    biography: 'Mais um exemplo de usuário',
  },
];

describe('AccountController', () => {
  let controller: AccountController;
  let prismaService: PrismaService;
  let usersList: AccountEntity[];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [AccountService, PrismaService],
    }).compile();

    controller = module.get<AccountController>(AccountController);
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

  it('should Account controller be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should Account controller create account', async () => {
    const user = {
      name: 'Rodrigo Smith',
      email: 'rodrigo@example.com',
      password: '@StrongPassword1323',
      birthdate: '1990-12-10',
      biography: 'Mais um exemplo de usuário',
    };
    const response = await controller.create(user);

    expect(response).toHaveProperty('name', user.name);
    expect(response).toHaveProperty('email', user.email);
    expect(response).toHaveProperty('birthdate', user.birthdate);
    expect(response).toHaveProperty('createdAt');
    expect(response).toHaveProperty('password');
    expect(response).toHaveProperty('biography', user.biography);
  });

  it('should Account controller return user', async () => {
    const user = new AccountEntity(usersList[0]);
    const findUser = await controller.findOne(user.id);

    expect(findUser).toEqual(user);
  });
  it('should Account controller get all user', async () => {
    const findAllUser = (await controller.findAll()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const expectedUser = AccountEntity.handlerAccountList(usersList).sort(
      (a, b) => a.name.localeCompare(b.name),
    );
    expect(findAllUser).toEqual(expectedUser);
  });

  it('should Account controller update user', async () => {
    const user = usersList[0];
    const newUserData = {
      name: 'Miguel Sampaio',
      biography: 'Teste de update user',
    };
    const updateUser = await controller.update(user.id, newUserData);
    const expectedUser = new AccountEntity({ ...user, ...newUserData });
    expect(updateUser).toEqual(expectedUser);
  });

  it('should Account controller remove user', async () => {
    const user = usersList[0];

    await controller.remove(user.id);
    const expectedUser = await prismaService.account.findUnique({
      where: { id: user.id },
    });

    expect(null).toEqual(expectedUser);
  });
});
