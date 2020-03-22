import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTaxReturnComponent } from './income-tax-return.component';

describe('IncomeTaxReturnComponent', () => {
  let component: IncomeTaxReturnComponent;
  let fixture: ComponentFixture<IncomeTaxReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeTaxReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTaxReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
