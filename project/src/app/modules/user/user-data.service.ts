import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { User } from "../../models/user.model";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class UserDataService {
  private readonly _url = "https://surveymaster-gy9m.onrender.com/";

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  //Get user profile
  getUserData(): Observable<User> {
    return this.http.get<User>(this._url + "API/user", {
      headers: new HttpHeaders().set(
        "Authorization",
        "Bearer " + this.auth.token
      ),
    });
  }
}
