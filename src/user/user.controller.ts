import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { transformtoNumber } from 'src/util/pipe';

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
}
