import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return Promise.resolve('token-key');
  }
  refresh() {
    return Promise.resolve('every-success-request-refresh-token');
  }
}
