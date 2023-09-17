import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { AccountEntity } from '../entities/account.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('account')
@Controller('users')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({
    summary: 'Create account user',
    description: 'endpoint to create an account',
  })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({
    summary: 'List All User Register',
    description: 'endpoint to query all registered users',
  })
  findAll(): Promise<AccountEntity[]> {
    return this.accountService.findAll();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({
    summary: 'Get by id user register',
    description: 'endpoint to search for a user by id',
  })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update by id user register',
    description: 'endpoint to update for a user by id',
  })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete by id user register',
    description: 'endpoint to delete for a user by id',
  })
  remove(@Param('id') id: string) {
    return this.accountService.remove(id);
  }
}
