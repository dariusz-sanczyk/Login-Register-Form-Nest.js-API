import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { CreatUserParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../../dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  findAllUsers() {
    return this.userRepository.find();
  }

  findUserById(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  createUser(userCredentials: CreatUserParams) {
    const newUser = this.userRepository.create({ ...userCredentials });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, userDetails: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...userDetails });
  }

  deletUserById(id: number) {
    return this.userRepository.delete({ id });
  }
}
