import { TestBed } from '@angular/core/testing';

import { ServicioAlimentacion } from './servicio-alimentacion';

describe('ServicioAlimentacion', () => {
  let service: ServicioAlimentacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAlimentacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
