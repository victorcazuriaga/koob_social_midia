import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
export class CreateAccountDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthdate: string;

  @ApiPropertyOptional()
  @ApiProperty()
  biography: string;

  constructor(partial: Partial<CreateAccountDto>) {
    Object.assign(this, partial);
  }
}
