import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  private _url = 'http://localhost:3000/';
  private _user$: BehaviorSubject<string>;
  public redirectUrl;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<string>(
      currentUser && currentUser.username);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<TokenResponse>(this._url + 'login',
      { username: username, password: password }).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            token: token
          }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post<TokenResponse>(this._url + 'register',
      { username: username, password: password }).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            token: res.token
          }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    if(this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
    }
  }

}

interface TokenResponse {
  token: string;
}


