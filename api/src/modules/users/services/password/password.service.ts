import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordReset } from 'src/typeorm/entities/Password.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(PasswordReset)
    private passwordRepository: Repository<PasswordReset>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async forgotPassword(body: any) {
    const user = await this.userRepository.findOneBy({ email: body.email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.passwordRepository.save(body);
  }

  findOne(token) {
    return this.passwordRepository.findOneBy(token);
  }

  async resetPassword(email: any) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
