import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { PrismaService } from 'src/database/prisma.service';
import { encodePassword } from 'src/utils/bcrypt';
import { AccountEntity } from '../entities/account.entity';
@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAccountDto): Promise<AccountEntity> {
    // TODO: refazer try catch com global handling error
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
      const deleteUserById = await this.prisma.account.delete({
        where: { id: id },
      });
      return deleteUserById;
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
