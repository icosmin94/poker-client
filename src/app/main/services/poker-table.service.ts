import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {PokerTable} from '../models/pokertable';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import {OAuthService} from 'angular-oauth2-oidc-codeflow';

@Injectable({
  providedIn: 'root'
})
export class PokerTableService {

  private pokerTableUrl = 'table-management/tables-all';

  constructor(private http: HttpClient,
              private oauthService: OAuthService ) { }

  getPokerTables(): Observable<PokerTable[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.oauthService.getAccessToken());

    return this.http.get<PokerTable[]>(environment.backendUrl +  this.pokerTableUrl, {headers} )
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
