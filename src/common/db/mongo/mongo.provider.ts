import { FactoryProvider } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as Path from 'path';

const databaseType: DataSourceOptions['type'] = 'mongodb';

const initDb = async () => {
  const MONGO_CONFIG: DataSourceOptions = {
    name: process.env.MONGO_DATABASE,
    url: process.env.MONGDO_URL,
    database: process.env.MONGO_TABLE,
    logging: false,
    synchronize: true,
    entities: [Path.join(__dirname, `./entity/*.mongo.entity{.ts,.js}`)],
    type: databaseType,
    useNewUrlParser: true,
  };

  const dbSource = new DataSource(MONGO_CONFIG);
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
