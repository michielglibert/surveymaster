import { NgModule } from "@angular/core";
import { SurveyComponent } from "./survey/survey.component";
import { AddsurveyComponent } from "./addsurvey/addsurvey.component";
import { SurveyresultComponent } from "./surveyresult/surveyresult.component";
import { SurveyDataService } from "./survey-data.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SurveyResolver } from "./survey.resolver";
import { FormsModule } from "@angular/forms";


const routes = [
    { path: '', component: SurveyComponent, resolve: { survey: SurveyResolver } },
    { path: 'addsurvey', component: SurveyComponent },
    { path: 'surveyresult', component: SurveyComponent }
];

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule
    ],
    declarations: [
        SurveyComponent,
        AddsurveyComponent,
        SurveyresultComponent,
    ],
    providers: [
        SurveyDataService,
        SurveyResolver
    ]
})

export class SurveyModule {

}