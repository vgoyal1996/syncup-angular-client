import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReturnFormDialogComponent } from './edit-return-form-dialog.component';

describe('EditReturnFormDialogComponent', () => {
  let component: EditReturnFormDialogComponent;
  let fixture: ComponentFixture<EditReturnFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReturnFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReturnFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
