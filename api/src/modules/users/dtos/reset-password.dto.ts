import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  token: string;
  @IsString()
  password: string;
  @IsString()
  password_confirm: string;
}
