import { Component, OnInit } from '@angular/core';
import { SurveyDataService } from '../survey-data.service';
import { Survey } from '../../../models/survey.model';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  private _survey: Survey;
  private _loading: boolean;


  constructor(private surveyData: SurveyDataService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.data.subscribe(item => this._survey = item['survey']);
  }

  skipQuestion() {
    this._loading = true;
    this.surveyData.getSurvey().subscribe(data =>  {
      this._survey = data
      this._loading = false;
    });
  }

  get survey(): Survey {
    return this._survey;
  }

  get loading(): boolean {
    return this._loading;
  }

}
