import { TestBed } from '@angular/core/testing';

import { IndexagesService } from './indexages.service';

describe('IndexagesService', () => {
  let service: IndexagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
