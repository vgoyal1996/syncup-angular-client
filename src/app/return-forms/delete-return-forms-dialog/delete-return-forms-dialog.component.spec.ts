import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReturnFormsDialogComponent } from './delete-return-forms-dialog.component';

describe('DeleteReturnFormsDialogComponent', () => {
  let component: DeleteReturnFormsDialogComponent;
  let fixture: ComponentFixture<DeleteReturnFormsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReturnFormsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReturnFormsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
