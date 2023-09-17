import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { PrismaService } from 'src/database/prisma.service';
import { encodePassword } from 'src/utils/bcrypt';
import { AccountEntity } from '../entities/account.entity';
@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAccountDto): Promise<AccountEntity> {
    const checkIfUserExists = await this.prisma.account.findFirst({
      where: { email: data.email },
    });
    if (checkIfUserExists) {
      throw new HttpException('E-mail already registered', 400);
    }
    const password = await encodePassword(data.password);
    data.password = password;
    return await this.prisma.account.create({ data });
  }

  async findAll(): Promise<AccountEntity[]> {
    const allUsers = await this.prisma.account.findMany();
    return AccountEntity.handlerAccountList(allUsers);
  }

  async findOne(id: string): Promise<AccountEntity> {
    try {
      const searchUserById = await this.prisma.account.findUnique({
        where: { id: id },
      });
      return new AccountEntity(searchUserById);
    } catch {
      throw new NotFoundException('User not found');
    }
  }
  async findUserByEmail(email: string): Promise<AccountEntity> {
    try {
      const searchUserByEmail = await this.prisma.account.findUnique({
        where: { email: email },
      });
      return new AccountEntity(searchUserByEmail);
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: string, data: UpdateAccountDto) {
    try {
      if (data.password) data.password = await encodePassword(data.password);
      const updateUserById = await this.prisma.account.update({
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
      await this.prisma.account.delete({
        where: { id: id },
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
