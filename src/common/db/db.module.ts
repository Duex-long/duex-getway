import { Module } from '@nestjs/common';
import { MysqlProviders } from './mysql/mysql.provider';
import { redisProvider } from './redis/redis.provider';
import { MongoProviders } from './mongo/mongo.provider';

@Module({
  providers: [...MysqlProviders, redisProvider, ...MongoProviders],
  exports: [...MysqlProviders, redisProvider, ...MongoProviders],
})
export class DbModule {}
