import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseKitComponent } from './course-kit.component';

describe('CourseKitComponent', () => {
  let component: CourseKitComponent;
  let fixture: ComponentFixture<CourseKitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseKitComponent]
    });
    fixture = TestBed.createComponent(CourseKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
