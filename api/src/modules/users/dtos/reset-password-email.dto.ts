import { IsEmail } from 'class-validator';

export class ResetPasswordEmailDto {
  @IsEmail()
  email: string;
}
