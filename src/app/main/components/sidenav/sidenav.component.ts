import {Component, OnInit, ViewChild} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc-codeflow';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material/sidenav';

const SMALL_WIDHT_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  public isScreenSmall: boolean;
  @ViewChild(MatSidenav) sidenav: MatSidenav;

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
    this.breakpointObserver.observe(`(max-width: ${SMALL_WIDHT_BREAKPOINT}px)`)
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
    this.router.events.subscribe(() => {
      if (this.isScreenSmall) {
        this.sidenav.close();
      }
    });
  }
}
