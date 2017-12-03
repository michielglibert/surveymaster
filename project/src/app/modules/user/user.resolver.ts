import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserDataService } from "./user-data.service";
import { User } from "../../models/user.model";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserResolver implements Resolve<User> {
    constructor(private userData:UserDataService,
    private authService:AuthenticationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
        return this.userData.getUserData();
    }

}