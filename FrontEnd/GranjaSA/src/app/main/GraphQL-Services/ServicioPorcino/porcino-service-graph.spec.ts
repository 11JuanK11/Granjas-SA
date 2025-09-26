import { TestBed } from '@angular/core/testing';

import { PorcinoServiceGraph } from './porcino-service-graph';

describe('PorcinoServiceGraph', () => {
  let service: PorcinoServiceGraph;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorcinoServiceGraph);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
