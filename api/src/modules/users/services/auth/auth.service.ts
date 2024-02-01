/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Repository } from 'typeorm';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  async logIn(email: string, passwrd: string): Promise<any> {
    const user = await this.usersService.findUser(email);
    const isPasswordsMatched = await comparePasswords(passwrd, user.password);
    if (isPasswordsMatched) {
      user.profile = await this.userRepository
        .createQueryBuilder()
        .relation('profile')
        .of(user)
        .loadOne();
      const { password, ...userData } = user;
      return userData;
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
