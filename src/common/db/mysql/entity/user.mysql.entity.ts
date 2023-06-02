import { FactoryProvider } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: '' })
  tel?: string;

  @Column({ default: '' })
  email?: string;

  @Column({ default: '' })
  prevLoginTime?: string;

  @Column({ default: '0' })
  premission?: string;

  @CreateDateColumn()
  createDate?: string;

  @UpdateDateColumn()
  updateDate?: string;
}

export const userMysqlEntityProvider: FactoryProvider[] = [
  {
    provide: 'MYSQL_USER_PROVIDER',
    useFactory: async (AppDataSource) =>
      await AppDataSource.getRepository(User),
    inject: ['DB_MYSQL'],
  },
];
