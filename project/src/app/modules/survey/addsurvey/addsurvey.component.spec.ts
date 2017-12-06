import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsurveyComponent } from './addsurvey.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material.module';

describe('AddsurveyComponent', () => {
  let component: AddsurveyComponent;
  let fixture: ComponentFixture<AddsurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsurveyComponent ],
      imports: [ MaterialModule, FlexLayoutModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
