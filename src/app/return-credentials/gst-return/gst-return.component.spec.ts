import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstReturnComponent } from './gst-return.component';

describe('GstReturnComponent', () => {
  let component: GstReturnComponent;
  let fixture: ComponentFixture<GstReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
