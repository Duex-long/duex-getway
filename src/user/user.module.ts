import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbModule } from 'src/common/db/db.module';
import { userMysqlEntityProvider } from 'src/common/db/mysql/entity/user.mysql.entity';

@Module({
  imports: [DbModule],
  controllers: [UserController],
  providers: [UserService, ...userMysqlEntityProvider],
})
export class UserModule {}
