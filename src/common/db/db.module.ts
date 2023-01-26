import { Module } from '@nestjs/common';
import { MysqlProviders } from './mysql/mysql.provider';
import { redisProvider } from './redis/redis.provider';

@Module({
  providers: [...MysqlProviders, redisProvider],
  exports: [...MysqlProviders, redisProvider],
})
export class DbModule {}
