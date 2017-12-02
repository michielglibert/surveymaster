import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SurveyModule } from './modules/survey/survey.module';
import { UserModule } from './modules/user/user.module';
import { AppRouteModule } from './modules/app-routing/app-routing.module';
import { MaterialModule } from './modules/material.module';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './modules/user/authentication.service';
import { AuthGuardService } from './modules/user/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,  
    FormsModule,  
    //Eigen modules
    SurveyModule,
    UserModule,
    AppRouteModule,
    MaterialModule
    
  ],
  entryComponents: [
    LoginDialogComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
