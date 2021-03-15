import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc-codeflow';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  @Output()
  toggleSidenav = new EventEmitter<void>();

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
