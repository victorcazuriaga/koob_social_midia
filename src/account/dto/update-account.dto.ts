import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountDto } from './create-account.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  biography?: string;
  @ApiProperty()
  birthdate?: string;
}
