import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  constructor() {
    console.log('Article表注入');
  }

  /**自增主键 */
  @PrimaryGeneratedColumn()
  id?: number;

  /**所属分类 */
  @Column({ default: '' })
  sort?: string;

  /**内容 */
  @Column({ type: 'longtext' })
  content: string;

  /**创建时间 */
  @CreateDateColumn()
  createDate?: string;

  /**更新时间 */
  @UpdateDateColumn()
  updateDate?: string;
}
