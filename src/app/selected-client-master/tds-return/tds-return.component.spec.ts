import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdsReturnComponent } from './tds-return.component';

describe('TdsReturnComponent', () => {
  let component: TdsReturnComponent;
  let fixture: ComponentFixture<TdsReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdsReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdsReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
