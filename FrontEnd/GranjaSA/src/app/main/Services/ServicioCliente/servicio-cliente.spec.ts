import { TestBed } from '@angular/core/testing';

import { ServicioCliente } from './servicio-cliente';

describe('ServicioCliente', () => {
  let service: ServicioCliente;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCliente);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
