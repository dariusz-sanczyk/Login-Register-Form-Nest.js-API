import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserProfileDto } from '../../dtos/create-user-profile.dto';
import { ProfilesService } from '../../services/profiles/profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}
  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUserProfileDto,
  ) {
    return this.profilesService.createProfile(id, body);
  }
}
