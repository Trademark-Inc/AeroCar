import { TestBed } from '@angular/core/testing';

import { CarAdminService } from './caradmin.service';

describe('CaradminService', () => {
  let service: CarAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
