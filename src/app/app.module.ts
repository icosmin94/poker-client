import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc-codeflow';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/auth/realms/poker_backend',
  redirectUri: window.location.origin,
  clientId: 'poker_ui',
  scope: 'openid profile email',
  responseType: 'code',
  showDebugInformation: true,
  disableNonceCheck: true
};

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./main/main.module').then(m => m.MainModule)},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: '**', redirectTo: 'home'}
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
