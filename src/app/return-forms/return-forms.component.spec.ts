import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnFormsComponent } from './return-forms.component';

describe('ReturnFormsComponent', () => {
  let component: ReturnFormsComponent;
  let fixture: ComponentFixture<ReturnFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
