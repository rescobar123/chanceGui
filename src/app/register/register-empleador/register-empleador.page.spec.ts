import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmpleadorPage } from './register-empleador.page';

describe('RegisterEmpleadorPage', () => {
  let component: RegisterEmpleadorPage;
  let fixture: ComponentFixture<RegisterEmpleadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterEmpleadorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEmpleadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
