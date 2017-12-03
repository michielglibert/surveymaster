import { Component, OnInit, Output } from '@angular/core';
import { SurveyDataService } from '../survey-data.service';
import { Survey } from '../../../models/survey.model';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthenticationService } from '../../user/authentication.service';
import { LoginDialogComponent } from '../../../login-dialog/login-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';


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
  isLoggedIn: boolean;
  shareUrl: string = 'hi';


  constructor(private surveyData: SurveyDataService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.route.data.subscribe(item => {
      this._survey = item['survey'];
      this.applyLikes();
      this.sortComments();
      this.createShareUrl();
    });

    if (this.authService.user$.value) {
      this.isLoggedIn = true;
    }
  }

  createShareUrl() {
    if (this._survey !== null) {
      this.shareUrl = 'https://surveyymaster.herokuapp.com/survey/' + this._survey._id;
    }
  }

  answerQuestion(answer: number) {
    this.surveyData.answerSurvey(this._survey._id, answer).subscribe(survey => {
      this._survey.countAntwoord1 = survey.countAntwoord1;
      this._survey.countAntwoord2 = survey.countAntwoord2;
      this.showResult = true;
    });
  }

  skipQuestion() {
    this._loading = true;
    this.surveyData.getRandomSurvey().subscribe(data => {
      this._survey = data
      this.applyLikes();
      this.router.navigate(['/survey']);
      this._loading = false;
      this.showResult = false;
    });
  }

  applyLikes() {
    if (this._survey !== null) {
      this._survey.comments.forEach(comment => {
        comment.likes.forEach(like => {
          if (like.username === this.authService.user$.value) {
            comment.liked = true;
          }
        })
      })
    }
  }

  sortComments() {
    if (this._survey !== null) {
      this._survey.comments.sort((a, b) => b.likes.length - a.likes.length)
    }
  }

  addComment(form: NgForm) {
    if (form.valid) {
      this.surveyData.addCommentToSurvey(this._survey._id, this.newComment).subscribe(data => {
        let comment = data;
        this._survey.comments.push(comment);
      });
    }
  }

  like(comment) {
    let commentId = comment._id;
    console.log(comment);
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
  }

  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  showLoginDialog() {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '350px'
    }).afterClosed().subscribe(succes => {
      if (succes) { this.applyLikes() }
    });

  }

  get survey(): Survey {
    return this._survey;
  }

  get loading(): boolean {
    return this._loading;
  }

}
