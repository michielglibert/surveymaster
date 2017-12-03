import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Survey } from "../../models/survey.model";
import { Observable } from "rxjs/Observable";
import { SurveyDataService } from "./survey-data.service";
import { AuthenticationService } from "../user/authentication.service";

@Injectable()
export class SurveyByIdResolver implements Resolve<Survey> {
    constructor(private surveyData:SurveyDataService,
    private authService:AuthenticationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Survey | Observable<Survey> | Promise<Survey> {
        return this.surveyData.getSurveyById(route.params['id']);
    }

}