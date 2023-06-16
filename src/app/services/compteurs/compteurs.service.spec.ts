import { TestBed } from '@angular/core/testing';

import { CompteursService } from './compteurs.service';

describe('CompteursService', () => {
  let service: CompteursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
