import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserDataService {
  //private readonly _url = 'http://localhost:3000/';
  private readonly _url = 'https://surveyymaster.herokuapp.com/';

  constructor(private http: HttpClient,
  private auth:AuthenticationService) { }

  getUserData(): Observable<User> {
    return this.http.get<User>(this._url + 'API/user',
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.auth.token) });
  }

}
