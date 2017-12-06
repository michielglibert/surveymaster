import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../user/authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceStub: AuthenticationService;

  beforeEach(async(() => {
    authServiceStub = {
      _url: "",
      _user$: "",
      redirectUrl: "",
      http: ""
    }

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ MaterialModule, FlexLayoutModule, CommonModule, RouterTestingModule],
      providers: [
        {provide: AuthenticationService, useClass: MockUser}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
