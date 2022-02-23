import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesOfertasPropuestasPage } from './mensajes-ofertas-propuestas.page';

describe('MensajesOfertasPropuestasPage', () => {
  let component: MensajesOfertasPropuestasPage;
  let fixture: ComponentFixture<MensajesOfertasPropuestasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajesOfertasPropuestasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesOfertasPropuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
