import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Survey } from '../../models/survey.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../../models/comment.model';
import { AuthenticationService } from '../user/authentication.service';

@Injectable()
export class SurveyDataService {
  //private readonly _url = 'http://localhost:3000/';
  private readonly _url = 'https://surveyymaster.herokuapp.com/';

  constructor(private http: HttpClient,
    private authService: AuthenticationService) { }

  getRandomSurvey(): Observable<Survey> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<Survey>(this._url + 'API/survey',
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }

  getSurveyById(surveyId): Observable<Survey> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<Survey>(this._url + 'API/survey/' + surveyId ,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }

  newSurvey(survey:Survey):Observable<Survey> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<Survey>(this._url + 'API/surveys', survey,
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }

  addCommentToSurvey(surveyId, comment): Observable<Comment> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<Comment>(this._url + 'API/survey/' + surveyId + '/comments', { comment: comment },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }

  answerSurvey(surveyId, answer): Observable<Survey> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.put<Survey>(this._url + 'API/survey/' + surveyId + '/answer', { numberAnswer: answer },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }

  likeComment(commentId): Observable<boolean> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.put<boolean>(this._url + 'API/comment/' + commentId + '/like', {},
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }

  unlikeComment(commentId): Observable<boolean> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.put<boolean>(this._url + 'API/comment/' + commentId + '/unlike', {},
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }
}
