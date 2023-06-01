import { Module } from '@nestjs/common';
import { MysqlProviders } from './mysql/mysql.provider';
import { redisProvider } from './redis/redis.provider';
import { MongoProviders } from './mongo/mongo.provider';
import { mongodbProvider } from './mongo/mongo';

@Module({
  providers: [...MysqlProviders, redisProvider, mongodbProvider],
  exports: [...MysqlProviders, redisProvider, mongodbProvider],
})
export class DbModule {}
