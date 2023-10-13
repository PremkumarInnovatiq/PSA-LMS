import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteUserRejectComponent } from './invite-user-reject.component';

describe('InviteUserRejectComponent', () => {
  let component: InviteUserRejectComponent;
  let fixture: ComponentFixture<InviteUserRejectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InviteUserRejectComponent]
    });
    fixture = TestBed.createComponent(InviteUserRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
