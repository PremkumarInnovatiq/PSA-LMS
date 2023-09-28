import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProgramComponent } from './view-program.component';

describe('ViewProgramComponent', () => {
  let component: ViewProgramComponent;
  let fixture: ComponentFixture<ViewProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProgramComponent]
    });
    fixture = TestBed.createComponent(ViewProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
