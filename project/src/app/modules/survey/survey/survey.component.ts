import { Component, OnInit, Output } from '@angular/core';
import { SurveyDataService } from '../survey-data.service';
import { Survey } from '../../../models/survey.model';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthenticationService } from '../../user/authentication.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  private _survey: Survey;
  private _newComment: string;
  private _showResult: boolean;
  private _antwoordLabelArray: string[] = new Array;
  private _antwoordAantallenArray: number[];
  public shareUrl: string;


  constructor(private surveyData: SurveyDataService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    //Gets value from resolver (can be random survey or survey by id)
    this.route.data.subscribe(item => {
      this._survey = item['survey'];
      this.applyLikes();
      this.sortComments();
      this.createShareUrl();
    });
  }

  //Applies likes to comments, if a user is in the list of likes the attribute is changed to true
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

  //Sorts comment by amount of likes (comment with more likes are at top)
  sortComments() {
    if (this._survey !== null) {
      this._survey.comments.sort((a, b) => b.likes.length - a.likes.length)
    }
  }

  //Creates the url for sharing a survey
  createShareUrl() {
    if (this._survey !== null) {
      this.shareUrl = 'https://surveyymaster.herokuapp.com/survey/' + this._survey._id;
    }
  }

  //Answers the current survey
  answerQuestion(answer: number) {
    this.surveyData.answerSurvey(this._survey._id, answer).subscribe(survey => {
      this._survey.countAntwoord1 = survey.countAntwoord1;
      this._survey.countAntwoord2 = survey.countAntwoord2;
      this._showResult = true;
    });
  }

  //Gets the next questions (also applies likes and navigates correctly if route was by id)
  //Also makes sure that result isn't showed anymore
  nextQuestion() {
    this.surveyData.getRandomSurvey().subscribe(data => {
      this._survey = data
      this.applyLikes();
      this.router.navigate(['/survey']);
      this._showResult = false;
    });
  }

  //Add a comment to a survey, also show a snackbar
  addComment(form: NgForm) {
    if (form.valid) {
      this.surveyData.addCommentToSurvey(this._survey._id, this._newComment).subscribe(data => {
        let comment = data;
        this._survey.comments.push(comment);
        this.showSnackbar("Woop! Comment posted!", "Dismiss")
        form.resetForm();
      });
    }
  }

  //Like (or unlike) a comment, checks wether the comment was already liked
  //Also pushes (or slices) the like so the amount of likes gets increased (or decreased)
  like(comment) {
    let commentId = comment._id;
    if (comment.liked) {
      //Unlike
      this.surveyData.unlikeComment(commentId).subscribe(data => {
        comment.liked = false;
        let index = comment.likes.indexOf(data);
        comment.likes.splice(index, 1);
      })
    } else {
      //Like
      this.surveyData.likeComment(commentId).subscribe(data => {
        comment.liked = true;
        comment.likes.push(data);
      })
    }
  }

  //Show a snackbar (ref to MatSnackBar @angular/material)
  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get survey(): Survey {
    return this._survey;
  }

  get newComment(): string {
    return this._newComment;
  }

  set newComment(newComment: string) {
    this._newComment = newComment;
  }
  
  get showResult(): boolean {
    return this._showResult;
  }

  get antwoordLabelArray(): string[] {
    return this._antwoordLabelArray;
  }

  get antwoordAantallenArray(): number[] {
    return this._antwoordAantallenArray;
  }

}