import { TestBed } from '@angular/core/testing';

import { AvioService } from './avio.service';

describe('AvioService', () => {
  let service: AvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
