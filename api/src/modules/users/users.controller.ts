import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.findAllUsers();
  }

  @Get('/:id')
  getuserByID(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Patch('/:id')
  async updateUser(
    @Body() body: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.usersService.updateUser(id, body.password);
  }
}
