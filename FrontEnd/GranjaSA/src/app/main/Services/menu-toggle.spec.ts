import { TestBed } from '@angular/core/testing';

import { MenuToggle } from './menu-toggle';

describe('MenuToggle', () => {
  let service: MenuToggle;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuToggle);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
