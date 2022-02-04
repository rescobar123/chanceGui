import { TestBed } from '@angular/core/testing';

import { PropuestaService } from './propuesta.service';

describe('PropuestaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropuestaService = TestBed.get(PropuestaService);
    expect(service).toBeTruthy();
  });
});
