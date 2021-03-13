import { Component } from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc-codeflow';
import {authConfig} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poker-ui';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      console.log('Logged in');
    }).catch(err => {
      console.log('Unable to login');
    });
  }

  public login(): void {
    this.oauthService.initAuthorizationCodeFlow();
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  get givenName(): any {
    const claims: any = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims.name;
  }
}
