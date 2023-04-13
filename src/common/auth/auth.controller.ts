import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { User } from '../db/mysql/entity/user.mysql.entity';
import { AuthService } from './auth.service';
import { AuthInfoPipe } from './util/auth.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new AuthInfoPipe())
  async login(@Body() userInfo: User) {
    return await this.authService.login(userInfo);
  }

  @Post('register')
  @UsePipes(new AuthInfoPipe())
  async register(@Body() userInfo: User) {
    await this.authService.register(userInfo);
    return 'success';
  }

  @Get('getPublicKey')
  async getPublicKey(@Query('cacheKey') cacheKey: string) {
    return this.authService.generatePublicKey(cacheKey);
  }
}
