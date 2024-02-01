import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from '../../dtos/login-user.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async LoginUser(@Body() body: LoginUserDto) {
    await this.authService.logIn(body.email, body.password);
  }
}
