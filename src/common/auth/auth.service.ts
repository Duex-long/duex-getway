import { HttpException, Inject, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisClientType } from 'redis';
import { Repository } from 'typeorm';
import { User } from '../db/mysql/entity/user.mysql.entity';
import * as Rsa from 'node-rsa';
import { UserInfoParams } from './authType';
import * as md5 from 'js-md5';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MYSQL_TEST_PROVIDER')
    private userDB: Repository<User>,
    @Inject('REDIS_PROVIDER')
    private redisClient: RedisClientType,
    private readonly jwtService: JwtService,
  ) {}
  privateKeyMap = new Map<string, string>();
  /** 登陆 */
  async login(userInfo: UserInfoParams) {
    /**验证信息合法  pipe*/
    userInfo.password = this.decrypt(userInfo.cacheKey, userInfo.password);
    /**是否存在 */
    const findOne = await this.userDB.findOne({
      where: {
        username: userInfo.username,
        password: userInfo.password,
      },
    });
    if (!findOne) return Promise.resolve('用户名或密码错误');
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
  /** 注册 */
  async register(userInfo: User) {
    userInfo.password = md5(userInfo.password);
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
        return true;
      }
      throw new HttpException('登陆过期，请重新登录', HttpStatus.OK);
    } catch {
      throw new HttpException('服务出错', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /**生成密钥 */
  generatePublicKey(cacheKey: string) {
    const newkey = new Rsa({ b: 1024 });
    newkey.setOptions({ encryptionScheme: 'pkcs1' });
    const public_key: string = newkey
      .exportKey('public')
      .replace('-----BEGIN PUBLIC KEY-----', '')
      .replace('-----END PUBLIC KEY-----', '')
      .replaceAll('\n', ''); //公钥
    const private_key: string = newkey.exportKey('private'); //私钥
    this.privateKeyMap.set(cacheKey, private_key);
    return public_key;
  }
  /**解密 */
  decrypt(cacheKey: string, cipher: string) {
    if (!cacheKey || !cipher) {
      throw new HttpException('登录登录信息有误', HttpStatus.BAD_REQUEST);
    }
    try {
      const privateKey = this.privateKeyMap.get(cacheKey);
      if (!privateKey) {
        throw new HttpException('登录错误，请重试', HttpStatus.BAD_REQUEST);
      }
      const rsaKey = new Rsa(privateKey);
      rsaKey.setOptions({ encryptionScheme: 'pkcs1' });
      return rsaKey.decrypt(cipher, 'utf8');
    } finally {
      /** 作废 */
      console.log('作废');
      this.privateKeyMap.delete(cacheKey);
    }
  }
}
