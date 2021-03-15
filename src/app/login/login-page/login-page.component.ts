import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc-codeflow';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private oauthService: OAuthService) {

  }

  public login(): void {
    this.oauthService.initAuthorizationCodeFlow();
  }

  ngOnInit(): void {
  }

}
