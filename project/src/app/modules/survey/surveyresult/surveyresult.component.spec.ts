import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyresultComponent } from './surveyresult.component';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('SurveyresultComponent', () => {
  let component: SurveyresultComponent;
  let fixture: ComponentFixture<SurveyresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyresultComponent ],
      imports: [ MaterialModule, FlexLayoutModule ]
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
