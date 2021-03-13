import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthConfig, OAuthModule} from 'angular-oauth2-oidc-codeflow';
import {HttpClientModule} from '@angular/common/http';
import { MainContentComponent } from './main-content/main-content/main-content.component';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/auth/realms/poker_backend',
  redirectUri: window.location.origin,
  clientId: 'poker_ui',
  scope: 'openid profile email',
  responseType: 'code',
  showDebugInformation: true,
  disableNonceCheck: true
};

@NgModule({
  declarations: [
    AppComponent,
    MainContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
