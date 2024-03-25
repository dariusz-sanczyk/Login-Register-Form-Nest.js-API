import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordEmailDto } from '../../dtos/reset-password-email.dto';
import { ResetPasswordDto } from '../../dtos/reset-password.dto';
import { PasswordService } from '../../services/password/password.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../services/users/users.service';

@Controller('resetpassword')
export class PasswordController {
  constructor(
    private passwordService: PasswordService,
    private mailerService: MailerService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  @Post('email')
  async sentEmail(@Body() body: ResetPasswordEmailDto) {
    const token = Math.random().toString(20).substr(2, 12);
    await this.passwordService.forgotPassword({
      email: body.email,
      token: token,
    });

    const url = `${this.configService.get('APP_URL')}/reset/${token}`;

    await this.mailerService.sendMail({
      to: body.email,
      subject: 'Reset your password for LoginApp account.',
      html: `Click <a href="${url}">here</a> to reset your password.`,
    });
  }

  @Post('reset')
  async reset(@Body() body: ResetPasswordDto) {
    const passwordToReset = await this.passwordService.findOne(body.token);
    const user = await this.userService.findUser(passwordToReset.email);
    await this.passwordService.resetPassword(user);
  }
}
