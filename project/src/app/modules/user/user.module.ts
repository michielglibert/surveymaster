import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserDataService } from "./user-data.service"
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationService } from './authentication.service';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';

const routes = [
    { path: 'profile', component: UserComponent, canActivate: [AuthGuardService]},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]}
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
        UserComponent,
        RegisterComponent,
        LogoutComponent,
        LoginComponent     
    ],
    providers: [
        UserDataService
    ]
})

export class UserModule {

}