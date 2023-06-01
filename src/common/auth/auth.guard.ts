import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FastifyRequest } from 'fastify';
@Injectable()
export class AuthGuard implements CanActivate {
  private whiteList = ['auth', 'example', 'article'];
  constructor(private authService: AuthService) {}
  // @ts-ignore
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean>> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const path = request.routerPath;
    const isAuthMethod = this.inCludeWhiteList(path, this.whiteList);
    if (isAuthMethod) {
      return true;
    }
    const token = request.headers.token;
    // const tokenAble = await this.validateJWT(token);
    // if (!tokenAble) {
    //   throw new HttpException('Not Login', HttpStatus.OK);
    // }
    return true;
  }

  // private async clientRedis() {
  //   const client = await createClient({ url: 'redis://localhost:6379' });
  //   await client.connect();
  //   return client;
  // }

  private inCludeWhiteList(url: string, whiteList: string[]) {
    const pathSplit = url.split('/');
    pathSplit.shift();
    const result = pathSplit.some((clip) => whiteList.includes(clip));
    return result;
  }
}
