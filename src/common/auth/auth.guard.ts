import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  private whiteList = ['', 'auth'];
  private inCludeWhiteList(url: string, whiteList: string[]) {
    const pathSplit = url.split('/');
    pathSplit.shift();
    const result = pathSplit.some((clip) => whiteList.includes(clip));
    return result;
  }
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
    // if(this.whiteList.includes())
    return true;
  }
}
