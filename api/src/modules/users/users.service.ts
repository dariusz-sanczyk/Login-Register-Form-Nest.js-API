import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { CreatUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findAllUsers() {}

  createUser(userCredentials: CreatUserParams) {
    const newUser = this.userRepository.create({ ...userCredentials });
    return this.userRepository.save(newUser);
  }
}
