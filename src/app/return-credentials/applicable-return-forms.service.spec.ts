import { TestBed } from '@angular/core/testing';

import { ApplicableReturnFormsService } from './applicable-return-forms.service';

describe('ApplicableReturnFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicableReturnFormsService = TestBed.get(ApplicableReturnFormsService);
    expect(service).toBeTruthy();
  });
});
