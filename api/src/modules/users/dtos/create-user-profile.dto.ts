import { IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  DOB: Date;
}
