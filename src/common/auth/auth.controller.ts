import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { User } from '../db/mysql/entity/user.mysql.entity';
import { AuthService } from './auth.service';
import { AuthInfoPipe } from './util/auth.pipe';
import { UserInfoParams } from './authType';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /** 登陆 */
  @Post('login')
  @UsePipes(new AuthInfoPipe())
  async login(@Body() userInfo: UserInfoParams) {
    return await this.authService.login(userInfo);
  }
  /** 注册 */
  @Post('register')
  @UsePipes(new AuthInfoPipe())
  async register(@Body() userInfo: User) {
    await this.authService.register(userInfo);
    return 'success';
  }
  /** 拿到公钥 */
  @Get('getPublicKey')
  async getPublicKey(@Query('cacheKey') cacheKey: string) {
    return await this.authService.generatePublicKey(cacheKey);
  }
}
