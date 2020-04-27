import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedClientMasterComponent } from './selected-client-master.component';

describe('SelectedClientMasterComponent', () => {
  let component: SelectedClientMasterComponent;
  let fixture: ComponentFixture<SelectedClientMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedClientMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedClientMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
