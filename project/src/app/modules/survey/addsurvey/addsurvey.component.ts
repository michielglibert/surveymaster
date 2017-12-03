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
  vraag: string;
  antwoord1: string;
  antwoord2: string;

  constructor(private surveyData: SurveyDataService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let survey = form.value;
      this.surveyData.newSurvey(survey).subscribe(data => {
        this.showSnackbar("Hooray, survey submitted!","Dismiss")
        this.router.navigate(['/survey/' + data._id]);
      })
    }
  }

  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
