import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Test } from '../db/mysql/entity/test.mysql.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MYSQL_TEST_PROVIDER')
    private testDB: Repository<Test>,
  ) {}
  login() {
    console.log('插入数据');
    this.testDB.save({
      name: '测试name',
    });
    return Promise.resolve('token-key');
  }
  refresh() {
    return Promise.resolve('every-success-request-refresh-token');
  }
}
