import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User.entity';
import { Profile } from 'src/typeorm/entities/Profile.entity';
import { ProfilesController } from './controllers/profiles/profiles.controller';
import { ProfilesService } from './services/profiles/profiles.service';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [UsersService, ProfilesService, AuthService],
  controllers: [UsersController, ProfilesController, AuthController],
})
export class UsersModule {}
