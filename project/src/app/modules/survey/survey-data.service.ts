import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Survey } from '../../models/survey.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SurveyDataService {
  private readonly _url = 'http://localhost:3000/';

  constructor(private http:HttpClient) { }

  getSurvey(): Observable<Survey> {
    return this.http.get<Survey>(this._url + 'API/survey');
  }
}
