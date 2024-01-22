import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    this.usersService.createUser(body);
    return body;
  }
}
