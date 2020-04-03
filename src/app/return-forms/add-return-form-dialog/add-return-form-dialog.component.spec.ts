import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnFormDialogComponent } from './add-return-form-dialog.component';

describe('AddReturnFormDialogComponent', () => {
  let component: AddReturnFormDialogComponent;
  let fixture: ComponentFixture<AddReturnFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReturnFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReturnFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
