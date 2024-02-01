import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return this.userRepository.find({ relations: ['profile'] });
  }

  async findUser(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    user.profile = await this.userRepository
      .createQueryBuilder()
      .relation('profile')
      .of(user)
      .loadOne();
    return user;
  }

  createUser(userData: CreatUserParams) {
    const newUser = this.userRepository.create({ ...userData });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, userDetails: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...userDetails });
  }

  deletUserById(id: number) {
    return this.userRepository.delete({ id });
  }

  async resetPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }
}
