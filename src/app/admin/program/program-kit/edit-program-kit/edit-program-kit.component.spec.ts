import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramKitComponent } from './edit-program-kit.component';

describe('EditProgramKitComponent', () => {
  let component: EditProgramKitComponent;
  let fixture: ComponentFixture<EditProgramKitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProgramKitComponent]
    });
    fixture = TestBed.createComponent(EditProgramKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
