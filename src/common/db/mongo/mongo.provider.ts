import { FactoryProvider } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as Path from 'path';
import { TestCommon } from './entity/common.mongo.entity';

const databaseType: DataSourceOptions['type'] = 'mongodb';

const initDb = async () => {
  const MONGO_CONFIG: DataSourceOptions = {
    name: process.env.MONGO_DATABASE,
    url: process.env.MONGDO_URL,
    database: 'PlatList',
    logging: false,
    synchronize: true,
    // entities: [Path.join(__dirname, `./entity/*.mongo.entity{.ts,.js}`)],
    entities: [TestCommon],
    type: databaseType,
    useNewUrlParser: true,
  };
  const dbSource = new DataSource(MONGO_CONFIG);
  console.log('mongo开始连接');
  try {
    await dbSource.initialize();
    console.log('mongo连接');
    return dbSource;
  } catch (e) {
    console.error('mongo连接失败');
    console.error(e);
  }
};

export const MongoProviders: FactoryProvider<DataSource>[] = [
  {
    provide: 'MongoProviders',
    useFactory: initDb,
  },
];
