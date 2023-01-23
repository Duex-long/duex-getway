import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { testMysqlEntityProvider } from '../db/mysql/entity/test.mysql.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DbModule],
  controllers: [AuthController],
  providers: [AuthService, ...testMysqlEntityProvider],
})
export class AuthModule {}
