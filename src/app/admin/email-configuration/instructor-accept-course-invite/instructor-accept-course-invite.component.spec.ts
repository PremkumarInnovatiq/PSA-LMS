import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAcceptCourseInviteComponent } from './instructor-accept-course-invite.component';

describe('InstructorAcceptCourseInviteComponent', () => {
  let component: InstructorAcceptCourseInviteComponent;
  let fixture: ComponentFixture<InstructorAcceptCourseInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorAcceptCourseInviteComponent]
    });
    fixture = TestBed.createComponent(InstructorAcceptCourseInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
