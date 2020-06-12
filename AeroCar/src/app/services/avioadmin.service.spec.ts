import { TestBed } from '@angular/core/testing';

import { AvioAdminService } from './avioadmin.service';

describe('AvioadminService', () => {
  let service: AvioAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvioAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
