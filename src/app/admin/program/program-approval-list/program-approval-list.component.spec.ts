import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramApprovalListComponent } from './program-approval-list.component';

describe('ProgramApprovalListComponent', () => {
  let component: ProgramApprovalListComponent;
  let fixture: ComponentFixture<ProgramApprovalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramApprovalListComponent]
    });
    fixture = TestBed.createComponent(ProgramApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
