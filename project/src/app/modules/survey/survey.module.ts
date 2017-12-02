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
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AuthenticationService } from "../user/authentication.service";
import { AuthGuardService } from "../user/auth-guard.service";


const routes = [
    { path: '', component: SurveyComponent, resolve: { survey: SurveyResolver } },
    { path: 'addsurvey', component: SurveyComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule,
        ChartsModule
    ],
    declarations: [
        SurveyComponent,
        AddsurveyComponent,
        SurveyresultComponent
    ],
    providers: [
        SurveyDataService,
        SurveyResolver
    ]
})

export class SurveyModule {

}