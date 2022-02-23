import { TestBed } from '@angular/core/testing';

import { OfertaPropuestaService } from './oferta-propuesta.service';

describe('OfertaPropuestaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfertaPropuestaService = TestBed.get(OfertaPropuestaService);
    expect(service).toBeTruthy();
  });
});
