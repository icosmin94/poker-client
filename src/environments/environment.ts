// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {AuthConfig} from 'angular-oauth2-oidc-codeflow';

export const environment = {
  production: false
};

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/auth/realms/poker_backend',
  redirectUri: window.location.origin,
  clientId: 'poker_ui',
  scope: 'openid profile email',
  responseType: 'code',
  showDebugInformation: true,
  disableNonceCheck: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
