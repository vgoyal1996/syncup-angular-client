import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRevisedDueDateDialogComponent } from './add-revised-due-date-dialog.component';

describe('AddRevisedDueDateDialogComponent', () => {
  let component: AddRevisedDueDateDialogComponent;
  let fixture: ComponentFixture<AddRevisedDueDateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRevisedDueDateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRevisedDueDateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
