import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {OAuthService} from 'angular-oauth2-oidc-codeflow';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private oauthService: OAuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const hasIdToken = this.oauthService.hasValidIdToken();
    const hasAccessToken = this.oauthService.hasValidAccessToken();
    if (hasIdToken && hasAccessToken) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

}
