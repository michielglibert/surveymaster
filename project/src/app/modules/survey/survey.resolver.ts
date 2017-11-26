import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Survey } from "../../models/survey.model";
import { Observable } from "rxjs/Observable";
import { SurveyDataService } from "./survey-data.service";

@Injectable()
export class SurveyResolver implements Resolve<Survey> {
    constructor(private surveyData:SurveyDataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Survey | Observable<Survey> | Promise<Survey> {
        return this.surveyData.getSurvey();
    }

}