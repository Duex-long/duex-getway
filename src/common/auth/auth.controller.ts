import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login() {
    console.log(process.env.ENVCONFIG_TEST, '测试配置文件');
    return this.authService.login();
  }
}
