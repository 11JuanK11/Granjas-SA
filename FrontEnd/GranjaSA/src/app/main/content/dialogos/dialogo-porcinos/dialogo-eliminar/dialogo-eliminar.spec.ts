import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEliminar } from './dialogo-eliminar';

describe('DialogoEliminar', () => {
  let component: DialogoEliminar;
  let fixture: ComponentFixture<DialogoEliminar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoEliminar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoEliminar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
