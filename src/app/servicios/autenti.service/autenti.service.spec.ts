import { TestBed } from '@angular/core/testing';

import { AutentiService } from './autenti.service';

describe('AutentiService', () => {
  let service: AutentiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
