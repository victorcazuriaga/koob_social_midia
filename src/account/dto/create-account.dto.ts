import { Exclude } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
export class CreateAccountDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @Exclude()
  password: string;

  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  biography: string;

  constructor(partial: Partial<CreateAccountDto>) {
    Object.assign(this, partial);
  }
}
