import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourseKitComponent } from './edit-course-kit.component';

describe('EditCourseKitComponent', () => {
  let component: EditCourseKitComponent;
  let fixture: ComponentFixture<EditCourseKitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCourseKitComponent]
    });
    fixture = TestBed.createComponent(EditCourseKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
