import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

interface SaveLogInterface {
  event: string;
  handler: 'load' | 'close' | 'click';
  time: string;
  page: string;
  url: string;
}

@Entity()
export class Common implements SaveLogInterface {
  constructor() {
    console.log('Common表注入-mongo');
  }
  @ObjectIdColumn()
  key: number;
  @Column({
    default: 'event',
  })
  event: string;
  @Column({
    default: 'handler',
  })
  handler: 'load' | 'close' | 'click';
  @Column()
  time: string;
  @Column()
  page: string;
  @Column()
  url: string;
}
