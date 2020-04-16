import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClientsDialogComponent } from './delete-clients-dialog.component';

describe('DeleteClientsDialogComponent', () => {
  let component: DeleteClientsDialogComponent;
  let fixture: ComponentFixture<DeleteClientsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteClientsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteClientsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
