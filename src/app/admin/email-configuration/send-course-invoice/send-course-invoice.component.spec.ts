import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCourseInvoiceComponent } from './send-course-invoice.component';

describe('SendCourseInvoiceComponent', () => {
  let component: SendCourseInvoiceComponent;
  let fixture: ComponentFixture<SendCourseInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendCourseInvoiceComponent]
    });
    fixture = TestBed.createComponent(SendCourseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
