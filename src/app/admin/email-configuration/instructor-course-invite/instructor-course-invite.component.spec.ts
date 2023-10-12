import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseInviteComponent } from './instructor-course-invite.component';

describe('InstructorCourseInviteComponent', () => {
  let component: InstructorCourseInviteComponent;
  let fixture: ComponentFixture<InstructorCourseInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorCourseInviteComponent]
    });
    fixture = TestBed.createComponent(InstructorCourseInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
