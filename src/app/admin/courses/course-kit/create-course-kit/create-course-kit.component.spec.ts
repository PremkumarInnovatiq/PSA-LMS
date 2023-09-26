import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCourseKitComponent } from './create-course-kit.component';

describe('CreateCourseKitComponent', () => {
  let component: CreateCourseKitComponent;
  let fixture: ComponentFixture<CreateCourseKitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCourseKitComponent]
    });
    fixture = TestBed.createComponent(CreateCourseKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
