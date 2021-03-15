import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc-codeflow';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';

const SMALL_WIDHT_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {


  constructor(private oauthService: OAuthService,
              private breakpointObserver: BreakpointObserver,
              private router: Router) { }


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
