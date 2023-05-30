import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
<<<<<<< HEAD
  private whiteList = ['auth', 'example'];
  constructor(private authService: AuthService) {
    console.log('守卫注入');
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.routerPath || request.route.path;
=======
  private whiteList = ['auth', 'example', 'article'];

  // @ts-ignore
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean>> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const path = request.routerPath;
>>>>>>> 98400c619caae18dfa9c2000721c9e767c30eebe
    const isAuthMethod = this.inCludeWhiteList(path, this.whiteList);
    if (isAuthMethod) {
      console.log('白名单');
      return true;
    }
    const token = request.headers.token;
<<<<<<< HEAD
    return this.authService.refresh(token);
=======
    const tokenAble = await this.validateJWT(token);
    if (!tokenAble) {
      throw new HttpException('Not Login', HttpStatus.OK);
    }
    return true;
  }

  private async clientRedis() {
    const client = await createClient({ url: 'redis://localhost:6379' });
    await client.connect();
    return client;
>>>>>>> 98400c619caae18dfa9c2000721c9e767c30eebe
  }

  private inCludeWhiteList(url: string, whiteList: string[]) {
    const pathSplit = url.split('/');
    pathSplit.shift();
    const result = pathSplit.some((clip) => whiteList.includes(clip));
    return result;
  }
}
