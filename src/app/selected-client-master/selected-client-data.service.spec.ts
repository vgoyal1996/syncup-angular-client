import { TestBed } from '@angular/core/testing';

import { SelectedClientDataService } from './selected-client-data.service';

describe('SelectedClientDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectedClientDataService = TestBed.get(SelectedClientDataService);
    expect(service).toBeTruthy();
  });
});
