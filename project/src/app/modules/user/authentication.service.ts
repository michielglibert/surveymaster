import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {
  private readonly _url = "https://surveymaster-gy9m.onrender.com/";
  private _user$: BehaviorSubject<string>;
  public redirectUrl;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this._user$ = new BehaviorSubject<string>(
      currentUser && currentUser.username
    );
  }

  //Logs user in and sets currentUser in localstorage
  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<TokenResponse>(this._url + "login", {
        username: username,
        password: password,
      })
      .map((res) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              username: username,
              token: token,
            })
          );
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  //Registers users and logs user in by setting currentUser in localstorage
  register(username: string, password: string): Observable<boolean> {
    return this.http
      .post<TokenResponse>(this._url + "register", {
        username: username,
        password: password,
      })
      .map((res) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              username: username,
              token: res.token,
            })
          );
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  //Check if username is available
  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http
      .post<CheckUsernameResponse>(this._url + "checkusername", {
        username: username,
      })
      .map((item) => {
        if (item.username === "alreadyexists") {
          return false;
        } else {
          return true;
        }
      });
  }

  //Logs user out by removing currentUser from local storage
  logout() {
    if (this.user$.value) {
      localStorage.removeItem("currentUser");
      setTimeout(() => this._user$.next(null));
    }
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    return JSON.parse(localStorage.getItem("currentUser")).token;
  }
}

//Interfaces for responses

interface TokenResponse {
  token: string;
}

interface CheckUsernameResponse {
  username: string;
}
