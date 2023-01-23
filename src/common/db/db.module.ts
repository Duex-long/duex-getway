import { Module } from '@nestjs/common';
import { MysqlProviders } from './mysql/mysql.provider';

@Module({
  providers: [...MysqlProviders],
  exports: [...MysqlProviders],
})
export class DbModule {}
