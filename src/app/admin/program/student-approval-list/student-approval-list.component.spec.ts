import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentApprovalListComponent } from './student-approval-list.component';

describe('StudentApprovalListComponent', () => {
  let component: StudentApprovalListComponent;
  let fixture: ComponentFixture<StudentApprovalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentApprovalListComponent]
    });
    fixture = TestBed.createComponent(StudentApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
