import { FactoryProvider } from '@nestjs/common';
import {
  Column,
  Entity,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Test {
  constructor() {
    console.log('test表注入');
  }
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: null })
  name: string;
}

export const testMysqlEntityProvider: FactoryProvider[] = [
  {
    provide: 'MYSQL_TEST_PROVIDER',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(Test),
    inject: ['DB_MYSQL'],
  },
];
