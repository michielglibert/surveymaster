import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Survey } from '../../../models/survey.model';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-surveyresult',
  templateUrl: './surveyresult.component.html',
  styleUrls: ['./surveyresult.component.css']
})
export class SurveyresultComponent implements OnInit {
  @ViewChild("baseChart") chart: BaseChartDirective;
  @Input('survey') private _survey: Survey;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ['#f44542','#2663ff']
    }
  ]
  public doughnutChartLabels: string[]
  public doughnutChartData: number[]
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          //FROM STACKOVERFLOW: https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages
          //get the concerned dataset
          let dataset = data.datasets[tooltipItem.datasetIndex];
          //calculate the total of this data set
          let total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
            return previousValue + currentValue;
          });
          //get the current items value
          let currentValue = dataset.data[tooltipItem.index];
          //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
          let percentage = Math.floor(((currentValue / total) * 100) + 0.5);

          return " " + percentage + "%";
        }
      }
    }
  }

  constructor() { }

  ngOnInit() {
    //Get all data from survey
    this.doughnutChartData = new Array;
    this.doughnutChartData.push(this._survey.countAntwoord2);
    this.doughnutChartData.push(this._survey.countAntwoord1);

    this.doughnutChartLabels = new Array;
    this.doughnutChartLabels.push(this._survey.antwoord2);
    this.doughnutChartLabels.push(this._survey.antwoord1);
  }

  //Calculates percentage for an answer
  getPercentageOfAnswer(value: number) {
    let total = 0;
    this.doughnutChartData.forEach(number => {
      total = total + number;
    })

    let percentage = Math.floor(((value / total) * 100) + 0.5);
    return percentage + "%";
  }

  get survey():Survey {
    return this._survey;
  }

}
