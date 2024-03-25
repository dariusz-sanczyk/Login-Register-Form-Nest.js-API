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
import { PasswordReset } from 'src/typeorm/entities/Password.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { PasswordController } from './controllers/password/password.controller';
import { PasswordService } from './services/password/password.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, PasswordReset]),
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 25,
      },
      defaults: {
        from: 'admin@dario.usermd.net',
      },
    }),
  ],
  providers: [UsersService, ProfilesService, AuthService, PasswordService],
  controllers: [
    UsersController,
    ProfilesController,
    AuthController,
    PasswordController,
  ],
})
export class UsersModule {}
