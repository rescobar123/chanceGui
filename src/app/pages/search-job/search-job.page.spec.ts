import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobPage } from './search-job.page';

describe('SearchJobPage', () => {
  let component: SearchJobPage;
  let fixture: ComponentFixture<SearchJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchJobPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
