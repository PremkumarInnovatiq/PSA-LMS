import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseReferralInviteComponent } from './course-referral-invite.component';

describe('CourseReferralInviteComponent', () => {
  let component: CourseReferralInviteComponent;
  let fixture: ComponentFixture<CourseReferralInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseReferralInviteComponent]
    });
    fixture = TestBed.createComponent(CourseReferralInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
