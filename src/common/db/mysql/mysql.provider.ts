import { FactoryProvider, Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as Path from 'path';

// provider实现Injectable装饰器

const initDb = async () => {
  const MYSQL_OPTIONS: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PSD,
    database: process.env.MYSQL_DATABASE,
    entities: [Path.join(__dirname, `./entity/*.mysql.entity{.ts,.js}`)],
    synchronize: true,
  };
  const DATABASE_INSTANCE = new DataSource(MYSQL_OPTIONS);
  await DATABASE_INSTANCE.initialize();
  console.log('mysql连接');
  return DATABASE_INSTANCE;
};

export const MysqlProviders: FactoryProvider[] = [
  {
    provide: 'DB_MYSQL',
    useFactory: initDb,
  },
];
