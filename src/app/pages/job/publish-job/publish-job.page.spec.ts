import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishJobPage } from './publish-job.page';

describe('PublishJobPage', () => {
  let component: PublishJobPage;
  let fixture: ComponentFixture<PublishJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishJobPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
