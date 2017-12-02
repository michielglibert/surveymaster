import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserDataService {
  private readonly _url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getUserProfile() {
    
  }

}
