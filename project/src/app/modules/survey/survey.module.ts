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
import { SurveyByIdResolver } from "./surveybyid.resolver";
import { ClipboardModule } from 'ngx-clipboard';


const routes = [
    { path: 'survey', component: SurveyComponent, resolve: { survey: SurveyResolver }, canActivate: [AuthGuardService] },
    { path: 'survey/:id', component: SurveyComponent, resolve: { survey: SurveyByIdResolver }, canActivate: [AuthGuardService] },
    { path: 'addsurvey', component: AddsurveyComponent, canActivate: [AuthGuardService] }
];

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule,
        ChartsModule,
        ClipboardModule
    ],
    declarations: [
        SurveyComponent,
        AddsurveyComponent,
        SurveyresultComponent
    ],
    providers: [
        SurveyDataService,
        SurveyResolver,
        SurveyByIdResolver
    ]
})

export class SurveyModule {

}