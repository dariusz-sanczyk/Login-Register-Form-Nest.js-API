import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserProfileDto } from '../../dtos/create-user-profile.dto';
import { ProfilesService } from '../../services/profiles/profiles.service';

@Controller('users')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}
  @Post(':id/profile')
  @HttpCode(201)
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUserProfileDto,
  ) {
    return this.profilesService.createProfile(id, body);
  }
}
