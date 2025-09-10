import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoIngresar } from './dialogo-ingresar';

describe('DialogoIngresar', () => {
  let component: DialogoIngresar;
  let fixture: ComponentFixture<DialogoIngresar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoIngresar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoIngresar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
