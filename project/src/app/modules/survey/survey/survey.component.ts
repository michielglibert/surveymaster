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
    this.route.data.subscribe(item => { this._survey = item['survey']; console.log(this._survey); });
  }

  skipQuestion() {
    this._loading = true;
    this.surveyData.getSurvey().subscribe(data => {
      this._survey = data
      this._loading = false;
    });
  }

  addComment(form:NgForm) {
    if(form.valid) {
      this.surveyData.addCommentToSurvey(this._survey._id, this.newComment).subscribe( data => {
        let comment = data;
        this._survey.comments.push(comment);
      });
    }
  }

  get survey(): Survey {
    return this._survey;
  }

  get loading(): boolean {
    return this._loading;
  }

}
