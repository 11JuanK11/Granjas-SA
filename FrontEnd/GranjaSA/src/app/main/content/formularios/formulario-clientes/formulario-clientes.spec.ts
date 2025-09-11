import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioClientes } from './formulario-clientes';

describe('FormularioClientes', () => {
  let component: FormularioClientes;
  let fixture: ComponentFixture<FormularioClientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioClientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioClientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
