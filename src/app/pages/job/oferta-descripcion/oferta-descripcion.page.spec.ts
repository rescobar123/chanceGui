import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaDescripcionPage } from './oferta-descripcion.page';

describe('OfertaDescripcionPage', () => {
  let component: OfertaDescripcionPage;
  let fixture: ComponentFixture<OfertaDescripcionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfertaDescripcionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfertaDescripcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
