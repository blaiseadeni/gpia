import { TestBed } from '@angular/core/testing';

import { RueService } from './rue.service';

describe('RueService', () => {
  let service: RueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
