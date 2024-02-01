/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  async logIn(username: string, passwrd: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user.password !== passwrd) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    user.profile = await this.userRepository
      .createQueryBuilder()
      .relation('profile')
      .of(user)
      .loadOne();
    const { password, ...userData } = user;
    return userData;
  }
}
