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

  async deleteUser(id: string) {
    // this.mysqlClient
    const findOne = await this.mysqlClient.findOne({
      where: {
        id: Number(id),
      },
    });
    if (!findOne) {
      throw new HttpException('用户名或密码有误', HttpStatus.OK);
    }
    try {
      await this.mysqlClient.delete(findOne);
      return 'success';
    } catch {
      throw new HttpException('删除用户失败', HttpStatus.OK);
    }
  }
}
