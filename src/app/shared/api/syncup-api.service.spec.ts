import { TestBed } from '@angular/core/testing';

import { SyncupApiService } from './syncup-api.service';

describe('SyncupApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyncupApiService = TestBed.get(SyncupApiService);
    expect(service).toBeTruthy();
  });
});
