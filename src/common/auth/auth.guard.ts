import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  private whiteList = ['auth', 'example'];
  constructor(private authService: AuthService) {
    console.log('守卫注入');
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.routerPath || request.route.path;
    const isAuthMethod = this.inCludeWhiteList(path, this.whiteList);
    if (isAuthMethod) {
      console.log('白名单');
      return true;
    }
    const token = request.headers.token;
    return this.authService.refresh(token);
  }

  private inCludeWhiteList(url: string, whiteList: string[]) {
    const pathSplit = url.split('/');
    pathSplit.shift();
    const result = pathSplit.some((clip) => whiteList.includes(clip));
    return result;
  }
}
