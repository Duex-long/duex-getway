import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { User } from 'src/common/db/mysql/entity/user.mysql.entity';

@Injectable()
export class AuthInfoPipe implements PipeTransform {
  checkIsPhone = (phone: string | null | undefined) =>
    /^(1[3456789]\d{9})$/.test(phone || '');

  transform(value: User, metadata: ArgumentMetadata) {
    // throw new Error('Method not implemented.');
    const { username, password, tel, email } = value;
    if (!username || !password) {
      throw new HttpException('请确认用户信息完整', HttpStatus.BAD_REQUEST);
    }
    if (tel && !this.checkIsPhone(tel)) {
      throw new HttpException('请填写正确的手机号码', HttpStatus.BAD_REQUEST);
    }
    return {
      username,
      password,
      tel,
      email,
    };
  }
}
