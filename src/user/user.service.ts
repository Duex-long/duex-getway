import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/common/db/mysql/entity/user.mysql.entity';
import { Repository } from 'typeorm';
import * as md5 from 'js-md5';

@Injectable()
export class UserService {
  constructor(
    @Inject('MYSQL_USER_PROVIDER') private mysqlClient: Repository<User>,
  ) {}
  async getUserList(page: number, total: number) {
    const idx = (page - 1) * total;
    const result = await this.mysqlClient.find({
      skip: idx,
      take: total,
    });
    return result.map((item) => {
      delete item.password;
      return item;
    });
  }

  async addUser(userInfo: User) {
    userInfo.password = md5(userInfo.password);
    try {
      await this.mysqlClient.save({
        ...userInfo,
      });
      return 'success';
    } catch (e) {
      console.log(e);
      throw new HttpException('添加用户错误', HttpStatus.OK);
    }
  }

  async deleteUser(userInfo: User) {
    // this.mysqlClient
  }
}
