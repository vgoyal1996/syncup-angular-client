import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RocReturnComponent } from './roc-return.component';

describe('RocReturnComponent', () => {
  let component: RocReturnComponent;
  let fixture: ComponentFixture<RocReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RocReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RocReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
