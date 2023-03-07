import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisClientType } from 'redis';
import { Repository } from 'typeorm';
import { User } from '../db/mysql/entity/user.mysql.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MYSQL_TEST_PROVIDER')
    private userDB: Repository<User>,
    @Inject('REDIS_PROVIDER')
    private redisClient: RedisClientType,
    private readonly jwtService: JwtService,
  ) {}

  async login(userInfo: User) {
    /**验证信息合法  pipe*/
    /**是否存在 */
    const findOne = await this.userDB.findOne({
      where: {
        username: userInfo.username,
        password: userInfo.password,
      },
    });
    if (!findOne) return '用户名或密码错误';
    /**更新数据库 */
    this.userDB.update(
      { id: findOne.id },
      { updateDate: new Date().toISOString() },
    );
    /**生成token */
    const access_token = this.jwtService.sign({
      username: findOne.username,
      sub: findOne.id,
    });
    /**设置redis */
    this.redisClient.set(access_token, String(findOne.id), {
      EX: 20 * 60,
    });
    /**返回token */

    return Promise.resolve({
      token: access_token,
      userId: findOne.id,
      username: findOne.username,
    });
  }
  async register(userInfo: User) {
    await this.userDB.save({
      ...userInfo,
    });
    return 'success';
  }

  async refresh(key: string) {
    try {
      const userId = await this.redisClient.get(key);
      if (userId) {
        this.redisClient.set(key, userId, {
          EX: 20 * 60,
        });
      }
    } catch {
      console.log('error');
    }
    // return Promise.resolve('every-success-request-refresh-token');
  }
}
