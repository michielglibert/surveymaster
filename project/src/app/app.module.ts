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


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,    
    //Eigen modules
    SurveyModule,
    UserModule,
    AppRouteModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
