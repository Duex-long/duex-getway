import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from '../db/db.module';
import { testMysqlEntityProvider } from '../db/mysql/entity/test.mysql.entity';
import { userMysqlEntityProvider } from '../db/mysql/entity/user.mysql.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

console.log('token secretkey dev');
@Module({
  imports: [
    DbModule,
    JwtModule.register({
      secret: 'testSecret',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...testMysqlEntityProvider,
    ...userMysqlEntityProvider,
  ],
})
export class AuthModule {}
