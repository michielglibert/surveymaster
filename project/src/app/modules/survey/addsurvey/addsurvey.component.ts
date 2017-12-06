import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SurveyDataService } from '../survey-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addsurvey',
  templateUrl: './addsurvey.component.html',
  styleUrls: ['./addsurvey.component.css']
})
export class AddsurveyComponent implements OnInit {
  private _vraag: string;
  private _antwoord1: string;
  private _antwoord2: string;

  constructor(private surveyData: SurveyDataService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  //Submits the form and show a snackbar, navigates to survey (by id) afterwards
  onSubmit(form: NgForm) {
    if (form.valid) {
      let survey = form.value;
      this.surveyData.newSurvey(survey).subscribe(data => {
        this.showSnackbar("Hooray, survey submitted!","Dismiss")
        this.router.navigate(['/survey/' + data._id]);
      })
    }
  }

  //Show a snackbar (ref to MatSnackBar @angular/material)
  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  get vraag(): string {
    return this._vraag;
  }

  set vraag(vraag: string) {
    this._vraag = vraag;
  }

  get antwoord1(): string {
    return this._antwoord1;
  }

  set antwoord1(antwoord1: string) {
    this._antwoord1 = antwoord1;
  }

  get antwoord2(): string {
    return this._antwoord2;
  }

  set antwoord2(antwoord2: string) {
    this._antwoord2 = antwoord2;
  }

}
