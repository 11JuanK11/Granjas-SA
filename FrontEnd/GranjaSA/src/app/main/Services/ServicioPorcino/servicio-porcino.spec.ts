import { TestBed } from '@angular/core/testing';

import { ServicioPorcino } from './servicio-porcino';

describe('ServicioPorcino', () => {
  let service: ServicioPorcino;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPorcino);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
