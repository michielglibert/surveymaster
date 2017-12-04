import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserDataService } from "./user-data.service"
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationService } from './authentication.service';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { UserResolver } from './user.resolver';
import { ReversePipe } from '../../pipes/ReversePipe';

const routes = [
    { path: 'user', component: UserComponent, canActivate: [AuthGuardService], resolve: {user: UserResolver}},
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
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        UserComponent,
        RegisterComponent,
        LogoutComponent,
        LoginComponent,
        ReversePipe     
    ],
    providers: [
        UserDataService,
        UserResolver
    ]
})

export class UserModule {

}