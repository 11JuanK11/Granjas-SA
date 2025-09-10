import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPorcinos } from './formulario-porcinos';

describe('FormularioPorcinos', () => {
  let component: FormularioPorcinos;
  let fixture: ComponentFixture<FormularioPorcinos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPorcinos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPorcinos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
