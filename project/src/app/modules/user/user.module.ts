import { NgModule } from '@angular/core';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDataService } from "./user-data.service"
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes = [
    { path: 'profile', component: UserComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
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
        LoginComponent,
        RegisterComponent,
    ],
    providers: [
        UserDataService
    ]
})

export class UserModule {

}