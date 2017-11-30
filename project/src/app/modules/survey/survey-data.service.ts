import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Survey } from '../../models/survey.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../../models/comment.model';

@Injectable()
export class SurveyDataService {
  private readonly _url = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getSurvey(): Observable<Survey> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.get<Survey>(this._url + 'API/survey',
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }

  addCommentToSurvey(surveyId, comment): Observable<Comment> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.post<Comment>(this._url + 'API/survey/' + surveyId + '/comments', { comment: comment },
      { headers: new HttpHeaders().set('Authorization', 'Bearer ' + currentUser.token) });
  }

  answerSurvey(surveyId, answer): Observable<number> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.http.put<number>(this._url + 'API/survey/' + surveyId + '/answer', { numberAnswer: answer },
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
