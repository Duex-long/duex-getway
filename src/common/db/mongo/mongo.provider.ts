import { DataSource, DataSourceOptions } from 'typeorm';
import * as Path from 'path';
import { FactoryProvider } from '@nestjs/common';

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
  await dbSource.initialize();
  console.log('mongo连接');
  return dbSource;
};

export const MongoProviders: FactoryProvider<DataSource>[] = [
  {
    provide: 'MongoProviders',
    useFactory: initDb,
  },
];
