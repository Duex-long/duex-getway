import { FactoryProvider } from '@nestjs/common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {
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
