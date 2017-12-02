import { Component, OnInit, Output } from '@angular/core';
import { SurveyDataService } from '../survey-data.service';
import { Survey } from '../../../models/survey.model';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthenticationService } from '../../user/authentication.service';
import { LoginDialogComponent } from '../../../login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  private _survey: Survey;
  private _loading: boolean;
  newComment: string;
  showResult: boolean;
  antwoordLabelArray: string[] = new Array;
  antwoordAantallenArray: number[];
  isLoggedIn:boolean;


  constructor(private surveyData: SurveyDataService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog) { }


  ngOnInit() {
    this.route.data.subscribe(item => {
      this._survey = item['survey'];
      this.applyLikes();
    });

    if(this.authService.user$.value) {
      this.isLoggedIn = true;
    }
  }

  answerQuestion(answer: number) {
    if (this.authService.user$.value) {
      this.surveyData.answerSurvey(this._survey._id, answer).subscribe(survey => {
        this._survey.countAntwoord1 = survey.countAntwoord1;
        this._survey.countAntwoord2 = survey.countAntwoord2;
        this.showResult = true;
      });
    } else {
      this.showLoginDialog();
    }
  }

  skipQuestion() {
    if (this.authService.user$.value) {
      this._loading = true;
      this.surveyData.getSurvey().subscribe(data => {
        this._survey = data
        this.applyLikes();
        this._loading = false;
        this.showResult = false;
      });
    } else {
      this.showLoginDialog();
    }
  }

  applyLikes() {
    this._survey.comments.forEach(comment => {
      comment.likes.forEach(like => {
        if (like.username === this.authService.user$.value) {
          comment.liked = true;
        }
      })
    })
  }

  addComment(form: NgForm) {
    if (this.authService.user$.value) {
      if (form.valid) {
        this.surveyData.addCommentToSurvey(this._survey._id, this.newComment).subscribe(data => {
          let comment = data;
          this._survey.comments.push(comment);
        });
      }
    } else {
      this.showLoginDialog();
    }
  }

  like(comment) {
    if (this.authService.user$.value) {
      let commentId = comment._id;

      if (comment.liked) {
        //Unlike
        this.surveyData.unlikeComment(commentId).subscribe(data => {
          comment.liked = false;
          let index = comment.likes.indexOf(data);
          if (index > -1) {
            comment.likes.splice(index, 1);
          }
        })
      } else {
        //Like
        this.surveyData.likeComment(commentId).subscribe(data => {
          comment.liked = true;
          comment.likes.push(data);
        })
      }
    } else {
      this.showLoginDialog();
    }
  }

  showLoginDialog() {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px'
    }).afterClosed().subscribe(succes => {
      if(succes) { this.applyLikes() }
    });
    
  }

  get survey(): Survey {
    return this._survey;
  }

  get loading(): boolean {
    return this._loading;
  }

}
