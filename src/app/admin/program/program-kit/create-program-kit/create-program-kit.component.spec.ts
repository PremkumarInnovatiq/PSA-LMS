import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProgramKitComponent } from './create-program-kit.component';

describe('CreateProgramKitComponent', () => {
  let component: CreateProgramKitComponent;
  let fixture: ComponentFixture<CreateProgramKitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProgramKitComponent]
    });
    fixture = TestBed.createComponent(CreateProgramKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
