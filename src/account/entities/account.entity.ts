import { Post } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class AccountEntity {
  id: string;
  name: string;
  email: string;
  @Exclude({ toPlainOnly: true })
  password: string;
  birthdate: string;
  biography: string;
  Post?: Post[];

  constructor(partial: Partial<AccountEntity>) {
    Object.assign(this, partial);
  }

  static handlerAccountList(accountList: AccountEntity[]) {
    return accountList.map((account) => new AccountEntity(account));
  }
}
