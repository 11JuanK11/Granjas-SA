import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Porcinos } from './porcinos';

describe('Porcinos', () => {
  let component: Porcinos;
  let fixture: ComponentFixture<Porcinos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Porcinos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Porcinos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
