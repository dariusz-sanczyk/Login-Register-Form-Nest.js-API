import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { User } from 'src/typeorm/entities/User.entity';
import { CreateUserProfile } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createProfile(id: number, profileDetails: CreateUserProfile) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const profile = this.profileRepository.create(profileDetails);
    const savedProfile = await this.profileRepository.save(profile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }
}
