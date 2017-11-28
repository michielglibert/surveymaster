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

const routes = [
    { path: 'profile', component: UserComponent},
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
        RegisterComponent        
    ],
    providers: [
        UserDataService,
        AuthenticationService
    ]
})

export class UserModule {

}