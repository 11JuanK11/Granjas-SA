import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEditar } from './dialogo-editar';

describe('DialogoEditar', () => {
  let component: DialogoEditar;
  let fixture: ComponentFixture<DialogoEditar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogoEditar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoEditar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
