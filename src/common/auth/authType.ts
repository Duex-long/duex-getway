import { User } from '../db/mysql/entity/user.mysql.entity';

export interface UserInfoParams extends User {
  cacheKey: string;
}
