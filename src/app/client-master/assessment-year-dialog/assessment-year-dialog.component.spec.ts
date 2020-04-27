import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentYearDialogComponent } from './assessment-year-dialog.component';

describe('AssessmentYearDialogComponent', () => {
  let component: AssessmentYearDialogComponent;
  let fixture: ComponentFixture<AssessmentYearDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentYearDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentYearDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
