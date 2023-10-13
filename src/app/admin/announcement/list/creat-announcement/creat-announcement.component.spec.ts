import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatAnnouncementComponent } from './creat-announcement.component';

describe('CreatAnnouncementComponent', () => {
  let component: CreatAnnouncementComponent;
  let fixture: ComponentFixture<CreatAnnouncementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatAnnouncementComponent]
    });
    fixture = TestBed.createComponent(CreatAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
