import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { transformtoNumber } from 'src/util/pipe';
import { AuthInfoPipe } from 'src/common/auth/util/auth.pipe';
import { User } from 'src/common/db/mysql/entity/user.mysql.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('getUserList')
  @UsePipes(transformtoNumber)
  async getUserList(
    @Query('page') page: number,
    @Query('total') total: number,
  ) {
    return await this.userService.getUserList(page, total);
  }
  /** 注册 */
  @Post('addUser')
  @UsePipes(new AuthInfoPipe())
  async register(@Body() userInfo: User) {
    await this.userService.addUser(userInfo);
    return 'success';
  }
}
