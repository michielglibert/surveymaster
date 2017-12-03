import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Injectable()
export class UserDataService {
  private readonly _url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getUserData(): Observable<User> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<User>(this._url + 'API/user',
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }

}
