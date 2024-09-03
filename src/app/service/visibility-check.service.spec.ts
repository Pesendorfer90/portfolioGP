import { TestBed } from '@angular/core/testing';

import { VisibilityCheckService } from './visibility-check.service';

describe('VisibilityCheckService', () => {
  let service: VisibilityCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisibilityCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
