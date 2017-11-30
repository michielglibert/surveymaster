import { Component, OnInit } from '@angular/core';
import { SurveyDataService } from '../survey-data.service';
import { Survey } from '../../../models/survey.model';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  private _survey: Survey;
  private _loading: boolean;
  newComment: string;

  constructor(private surveyData: SurveyDataService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.route.data.subscribe(item => {
      this._survey = item['survey']; console.log(this._survey);
      this._survey.comments.forEach(comment => {
        comment.likes.forEach(like => {
          if (like.username === currentUser.username ) {
            comment.liked = true;
          }
        })
      })
    });
  }

  answerQuestion(answer1Picked:boolean) {
    if(answer1Picked) {
      this.surveyData.answerSurvey(this._survey._id, 1).subscribe(count => {
        this._survey.countAntwoord1 = count;
      });
    } else {
      this.surveyData.answerSurvey(this._survey._id, 2).subscribe(count => {
        this._survey.countAntwoord2 = count;
      });
    }
  }

  skipQuestion() {
    this._loading = true;
    this.surveyData.getSurvey().subscribe(data => {
      this._survey = data
      this._loading = false;
    });
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

  get survey(): Survey {
    return this._survey;
  }

  get loading(): boolean {
    return this._loading;
  }

}
