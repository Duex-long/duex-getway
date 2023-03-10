import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { createClient } from 'redis';

@Injectable()
export class AuthGuard implements CanActivate {
  private whiteList = ['auth'];

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const path = request.routerPath;
    const isAuthMethod = this.inCludeWhiteList(path, this.whiteList);
    if (isAuthMethod) {
      console.log('白名单');
      return true;
    }
    const token = request.headers.token;
    const tokenAble = this.validateJWT(token);
    if (!tokenAble) {
      throw new HttpException('Not Login', HttpStatus.OK);
    }
    // if(this.whiteList.includes())
    return true;
  }

  private async clientRedis() {
    const client = await createClient({ url: 'redis://localhost:6379' });
    await client.connect();
    return client;
  }

  private inCludeWhiteList(url: string, whiteList: string[]) {
    const pathSplit = url.split('/');
    pathSplit.shift();
    const result = pathSplit.some((clip) => whiteList.includes(clip));
    return result;
  }

  private async validateJWT(token: string | string[]) {
    if (typeof token !== 'string') return false;
    const clientRedis = await this.clientRedis();
    const user = await clientRedis.get(token);
    clientRedis.disconnect();
    if (user) return true;
    // token验证
    return fail;
  }
}
