import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorRequestComponent } from './instructor-request.component';

describe('InstructorRequestComponent', () => {
  let component: InstructorRequestComponent;
  let fixture: ComponentFixture<InstructorRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorRequestComponent]
    });
    fixture = TestBed.createComponent(InstructorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
