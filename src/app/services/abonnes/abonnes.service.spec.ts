import { TestBed } from '@angular/core/testing';

import { AbonnesService } from './abonnes.service';

describe('AbonnesService', () => {
  let service: AbonnesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbonnesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
