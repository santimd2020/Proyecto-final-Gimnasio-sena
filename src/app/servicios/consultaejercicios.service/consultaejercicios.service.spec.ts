import { TestBed } from '@angular/core/testing';

import { ConsultaejerciciosService } from './consultaejercicios.service';

describe('ConsultaejerciciosService', () => {
  let service: ConsultaejerciciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaejerciciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
