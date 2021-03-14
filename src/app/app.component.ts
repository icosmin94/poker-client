import {Component} from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc-codeflow';
import {authConfig} from '../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poker-ui';

  constructor(private oauthService: OAuthService,
              private router: Router) {

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
      console.log('Logged in');
    }).catch(err => {
      console.log('Unable to login');
    });
    this.oauthService.events.subscribe(result => {
      if (result.type === 'token_refreshed') {
        router.navigate(['/']);
      }
    });
  }

}
