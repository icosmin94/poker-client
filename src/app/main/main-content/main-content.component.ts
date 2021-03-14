import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc-codeflow';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

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

  ngOnInit(): void {
  }

}
