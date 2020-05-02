import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnInfoDialogComponent } from './add-return-info-dialog.component';

describe('AddReturnInfoDialogComponent', () => {
  let component: AddReturnInfoDialogComponent;
  let fixture: ComponentFixture<AddReturnInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReturnInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReturnInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
