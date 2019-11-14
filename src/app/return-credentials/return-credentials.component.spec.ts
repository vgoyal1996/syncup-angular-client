import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCredentialsComponent } from './return-credentials.component';

describe('ReturnCredentialsComponent', () => {
  let component: ReturnCredentialsComponent;
  let fixture: ComponentFixture<ReturnCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
