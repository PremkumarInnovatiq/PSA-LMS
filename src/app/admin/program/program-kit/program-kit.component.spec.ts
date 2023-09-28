import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramKitComponent } from './program-kit.component';

describe('ProgramKitComponent', () => {
  let component: ProgramKitComponent;
  let fixture: ComponentFixture<ProgramKitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramKitComponent]
    });
    fixture = TestBed.createComponent(ProgramKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
