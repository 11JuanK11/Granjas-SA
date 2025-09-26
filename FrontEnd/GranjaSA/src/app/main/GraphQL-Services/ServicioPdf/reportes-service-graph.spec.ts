import { TestBed } from '@angular/core/testing';

import { ReportesServiceGraph } from './reportes-service-graph';

describe('ReportesServiceGraph', () => {
  let service: ReportesServiceGraph;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportesServiceGraph);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
