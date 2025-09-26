import { TestBed } from '@angular/core/testing';

import { ClienteServiceGraph } from './cliente-service-graph';

describe('ClienteServiceGraph', () => {
  let service: ClienteServiceGraph;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteServiceGraph);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
