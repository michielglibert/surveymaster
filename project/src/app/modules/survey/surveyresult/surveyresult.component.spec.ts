import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyresultComponent } from './surveyresult.component';

describe('SurveyresultComponent', () => {
  let component: SurveyresultComponent;
  let fixture: ComponentFixture<SurveyresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
