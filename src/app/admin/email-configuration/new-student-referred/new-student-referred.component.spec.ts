import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStudentReferredComponent } from './new-student-referred.component';

describe('NewStudentReferredComponent', () => {
  let component: NewStudentReferredComponent;
  let fixture: ComponentFixture<NewStudentReferredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewStudentReferredComponent]
    });
    fixture = TestBed.createComponent(NewStudentReferredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
