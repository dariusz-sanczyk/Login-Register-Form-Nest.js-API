import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginUserDto } from '../../dtos/login-user.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async LoginUser(@Body() body: LoginUserDto) {
    return await this.authService.logIn(body.email, body.password);
  }
}
